"use client";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import CheckoutForm from "../../component/Payment/CheckoutForm";
import { getCartItems } from "@/utils/cart";

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function App() {
    const [clientSecret, setClientSecret] = useState<string>("");

    useEffect(() => {
        async function createPaymentIntent() {
            setClientSecret("");
            const items = getCartItems();

            if (items.length === 0) {
                return;
            }
            const response = await fetch("/api/create-payment-intent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    items: items,
                    currency: "usd",
                }),
            });

            if (!response.ok) {
                // This will activate the closest `error.js` Error Boundary
                throw new Error("Failed to fetch data");
            }
            const { clientSecret } = await response.json();
            setClientSecret(clientSecret);
        }

        createPaymentIntent();
    }, []);

    const appearance = {
        theme: "stripe" as "stripe" | "night" | "flat" | undefined,
    };

    const options = {
        clientSecret,
        appearance,
    };
    console.log(clientSecret);
    return (
        <div className="w-full flex justify-center p-2">
            <div className="bg-card p-2 rounded-md">
                {clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                )}
            </div>
        </div>
    );
}
