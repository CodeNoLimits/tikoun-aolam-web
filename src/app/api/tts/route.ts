import { NextResponse } from 'next/server';

const GEMINI_API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
const TTS_MODEL = 'gemini-2.5-flash-preview-tts';

/** Add a 44-byte WAV header to raw PCM (24000 Hz, 16-bit, mono) */
function pcmToWav(pcmBuffer: Buffer): Buffer {
  const numChannels = 1;
  const sampleRate = 24000;
  const bitsPerSample = 16;
  const dataSize = pcmBuffer.length;
  const wav = Buffer.alloc(44 + dataSize);

  wav.write('RIFF', 0);
  wav.writeUInt32LE(36 + dataSize, 4);
  wav.write('WAVE', 8);
  wav.write('fmt ', 12);
  wav.writeUInt32LE(16, 16);                                          // chunk size
  wav.writeUInt16LE(1, 20);                                           // PCM
  wav.writeUInt16LE(numChannels, 22);
  wav.writeUInt32LE(sampleRate, 24);
  wav.writeUInt32LE(sampleRate * numChannels * (bitsPerSample / 8), 28); // byte rate
  wav.writeUInt16LE(numChannels * (bitsPerSample / 8), 32);           // block align
  wav.writeUInt16LE(bitsPerSample, 34);
  wav.write('data', 36);
  wav.writeUInt32LE(dataSize, 40);
  pcmBuffer.copy(wav, 44);

  return wav;
}

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'text required' }, { status: 400 });
    }
    if (!GEMINI_API_KEY) {
      return NextResponse.json({ error: 'Missing API key' }, { status: 500 });
    }

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${TTS_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text }] }],
          generationConfig: {
            responseModalities: ['AUDIO'],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: 'Charon' }, // deep male voice
              },
            },
          },
        }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error('Gemini TTS error:', res.status, err);
      return NextResponse.json({ error: 'TTS upstream failed' }, { status: 502 });
    }

    const data = await res.json();
    const audioBase64 =
      data?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (!audioBase64) {
      console.error('No audio data in Gemini response:', JSON.stringify(data));
      return NextResponse.json({ error: 'No audio in response' }, { status: 502 });
    }

    const pcmBuffer = Buffer.from(audioBase64, 'base64');
    const wavBuffer = pcmToWav(pcmBuffer);

    return new Response(new Uint8Array(wavBuffer), {
      headers: {
        'Content-Type': 'audio/wav',
        'Content-Length': String(wavBuffer.length),
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    console.error('TTS route error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
