import type { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../server/api/routers/stripe/stripe"; // Import the Stripe instance from lib/stripe

// Stripe's webhook secret
const endpointSecret = ""; // TODO add in webhook secret

// Disable body parsing for this route
export const config = {
  api: {
    bodyParser: false,
  },
};

const handleStripeWebhook = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  // Get the raw body of the request
  const sig = req.headers["stripe-signature"] as string;

  let event;

  try {
    // Verify the webhook signature
    event = stripe.webhooks.constructEvent(
      JSON.stringify(req.body),
      sig,
      endpointSecret,
    );
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event type
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      console.log("PaymentIntent was successful:", paymentIntent);
      // TODO add in success handling
      break;

    case "payment_intent.payment_failed":
      const paymentFailed = event.data.object;
      console.log("PaymentIntent failed:", paymentFailed);
      // TODO add in failure handling
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.status(200).json({ received: true });
};

export default handleStripeWebhook;
