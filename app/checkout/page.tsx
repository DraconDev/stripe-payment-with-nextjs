"use client";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import CheckoutForm from "../../component/Payment/CheckoutForm";
import { CartItem } from "@/types/cart";

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface Props {
    items: CartItem[];
}

export default function App({ items }: Props) {
    const [clientSecret, setClientSecret] = useState<string>("");

    useEffect(() => {
        async function createPaymentIntent() {
            setClientSecret("");
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
    }, [items]);

    const options = {
        clientSecret,
    };
    console.log(clientSecret);
    return (
        <div className="App">
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    );
}
