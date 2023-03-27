import Stripe from "stripe";
import { userService } from "services";

const stripe = new Stripe(process.env.NEXT_SECRET_API_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { sessionId, userId } = req.body;

    try {
      // Retrieve the Checkout Session
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      console.log("Stripe session response:", session); // Log the raw response

      // Check if the payment was successful
      if (session.payment_status === "paid") {
        // Update the user's subscription status
        const user = await userService.getById(userId);
        if (!user) {
          throw new Error(`User not found with ID: ${userId}`);
        }
        user.share_custom_varieties = true;
        const updatedUser = await userService.update(user._id, user);
        if (!updatedUser) {
          throw new Error(`Failed to update user with ID: ${user._id}`);
        }

        console.log("Updated user:", updatedUser); // Log the updated user object

        res.status(200).json({ success: true });
      } else {
        res.status(400).json({ error: "Payment not successful" });
      }
    } catch (error) {
      console.error("Error in verify-checkout-session:", error); // Add error logging
      res.status(500).json({ error: "Failed to verify Checkout Session", errorMessage: error.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
