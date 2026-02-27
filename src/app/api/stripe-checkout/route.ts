import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Price field name per currency
const PRICE_FIELDS: Record<string, string> = {
  ils: "price",
  eur: "priceEUR",
  usd: "priceUSD",
};

// Stripe smallest unit multiplier (all three use 100 = cents/agorot)
const UNIT_MULTIPLIER = 100;

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  try {
    const {
      items,
      name,
      phone,
      address,
      currency = "ils",
      shippingCountry = "IL",
      shippingCost = 0,
      tvaRate = 0.17,
    } = await req.json();

    if (!items?.length) {
      return NextResponse.json({ error: "Panier vide" }, { status: 400 });
    }

    const priceField = PRICE_FIELDS[currency] ?? "price";

    const lineItems = items.map((item: {
      product: Record<string, unknown>;
      qty: number;
    }) => {
      const basePrice = Number(item.product[priceField] ?? item.product.price) || 0;
      const priceWithTva = Math.round(basePrice * (1 + tvaRate) * UNIT_MULTIPLIER);

      return {
        price_data: {
          currency,
          product_data: {
            name: String(item.product.name),
            images: item.product.image ? [String(item.product.image)] : [],
          },
          unit_amount: priceWithTva,
        },
        quantity: item.qty,
      };
    });

    // Add shipping as a line item if > 0
    if (shippingCost > 0) {
      lineItems.push({
        price_data: {
          currency,
          product_data: {
            name: "Frais de livraison",
            images: [],
          },
          unit_amount: Math.round(shippingCost * UNIT_MULTIPLIER),
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout`,
      metadata: { name, phone, address, shippingCountry, currency },
      shipping_address_collection: {
        allowed_countries: ["IL", "FR", "BE", "CH", "CA", "US", "GB", "DE", "NL", "LU", "MA", "TN"],
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json({ error: "Stripe session failed" }, { status: 500 });
  }
}
