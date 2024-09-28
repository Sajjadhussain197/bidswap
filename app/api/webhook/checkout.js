import { loadStripe } from "@stripe/stripe-js";

// Function to serialize data into URL query parameters
function serializeFormData(data) {
  return Object.entries(data)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join("&");
}

export async function checkout({ lineItems, currentStep, formData }) {
  let stripePromise = null;

  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
    }
    return stripePromise;
  };

  try {
    const stripe = await getStripe();
    if (!stripe) {
      throw new Error("Failed to initialize Stripe");
    }

    // Serialize current step and form data to query string
    const serializedData = serializeFormData({
      currentStep,
      ...formData,
    });

    const successUrl = `${window.location.origin}/checkout?${serializedData}`;
    const cancelUrl = `${window.location.origin}/checkout?${serializedData}`;

    const { error } = await stripe.redirectToCheckout({
      mode: "payment",
      lineItems,
      successUrl,
      cancelUrl,
    });

    if (error) {
      console.error("Stripe checkout error:", error);
      throw new Error(error.message);
    }
  } catch (error) {
    console.error("Checkout error:", error);
    throw error;
  }
}
