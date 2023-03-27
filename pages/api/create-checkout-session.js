// /pages/api/create-checkout-session.js
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_SECRET_API_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "subscription",
        line_items: [
          {
            price: "price_1MpjF2EVmyPNhExzk8OzvcVy",
            quantity: 1,
          },
        ],
        success_url: `${req.headers.origin}/account/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: req.headers.origin,
      });

      res.status(200).json({ sessionId: session.id });
    } catch (error) {
      console.error("Error creating checkout session:", error);
      res.status(500).json({ error: "Error creating checkout session" });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}