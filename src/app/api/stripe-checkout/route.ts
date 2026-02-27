import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const TVA_RATE = 0.17; // Israel 17% VAT — must match cart-context.tsx

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  try {
    const { items, name, phone, address } = await req.json();

    if (!items?.length) {
      return NextResponse.json({ error: "Panier vide" }, { status: 400 });
    }

    const lineItems = items.map((item: {
      product: { name: string; price: number; image: string };
      qty: number;
    }) => ({
      price_data: {
        currency: "ils",
        product_data: {
          name: item.product.name,
          images: [item.product.image],
        },
        unit_amount: Math.round(item.product.price * (1 + TVA_RATE) * 100), // ILS agorot, TVA incluse
      },
      quantity: item.qty,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout`,
      metadata: { name, phone, address },
      shipping_address_collection: {
        allowed_countries: ["IL", "FR", "BE", "CH", "CA", "US"],
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json({ error: "Stripe session failed" }, { status: 500 });
  }
}
