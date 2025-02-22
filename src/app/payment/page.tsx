import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { api } from "~/trpc/server";

// Load your Stripe public key
const stripePromise = loadStripe(process.env.STRIPE_TEST_PUBLIC_KEY);

export default function Home() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  // Fetch the client secret when the component mounts
  useEffect(() => {
    const createPaymentIntent = async () => {
      const res = await api.stripe.payments.createDirectPayment({});
      const data = await res.json();
      setClientSecret(data.clientSecret);
    };

    createPaymentIntent();
  }, []);

  return (
    <div>
      <h1>Make a Payment</h1>

      {/* Only show the payment form once the client secret is received */}
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret!, // The client secret obtained from the server
      {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: "Customer Name", // Customize as needed
          },
        },
      },
    );

    if (error) {
      setErrorMessage(error.message);
    } else if (paymentIntent?.status === "succeeded") {
      alert("Payment succeeded!");
    } else {
      setErrorMessage("Something went wrong with the payment.");
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      {errorMessage && <div>{errorMessage}</div>}
      <button type="submit" disabled={isProcessing}>
        {isProcessing ? "Processing..." : "Pay $10.00"}
      </button>
    </form>
  );
}
