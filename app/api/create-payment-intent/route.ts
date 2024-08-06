import { CartItem } from "@/types/cart";
import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const zeroDecimalCurrencies = new Set([
    "BIF",
    "CLP",
    "DJF",
    "GNF",
    "JPY",
    "KMF",
    "KRW",
    "MGA",
    "PYG",
    "RWF",
    "UGX",
    "VND",
    "VUV",
    "XAF",
    "XOF",
    "XPF",
    // ... add any other zero-decimal currencies
]);

export const IS_TEST_MODE = true;

export const ACTIVE_CURRENCY = "usd";

export const TEST_CARD_NUMBER = "4242 4242 4242 4242";

const calculateOrderAmount = (items: CartItem[], currency: string) => {
    let sum = 0;
    if (items.length === 0) {
        return 0;
    }
    for (const item of items) {
        sum += item.price * item.quantity;
    }
    return currency in zeroDecimalCurrencies ? sum : sum * 100;
};

export async function POST(req: NextRequest, res: NextResponse) {
    const { items, currency }: { items: CartItem[]; currency: string } =
        await req.json();

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: calculateOrderAmount(items, currency),
            currency: currency,
            automatic_payment_methods: {
                enabled: true,
            },
        });
        return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
        console.log(err);
        return NextResponse.json({
            error: "Error creating checkout session",
        });
    }
}
