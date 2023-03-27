// File: /pages/api/stripe-webhook.js

import { userService } from "services";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_SECRET_API_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const event = await stripe.webhooks.constructEvent(
      req.body,
      req.headers["stripe-signature"],
      process.env.NEXT_WEBHOOK_SECRET
    );

    // Handle the event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const subscriptionId = session.subscription;
      const userId = session.metadata.userId;

      // Save the subscription ID and status in the user's record
      const user = await userService.getById(userId);
      user.subscriptionId = subscriptionId;
      user.subscriptionStatus = "active";
      await userService.update(userId, user);
    }

    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
