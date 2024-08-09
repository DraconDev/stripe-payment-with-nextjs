"use client";
import { CartItem } from "@/types/cart";
import Link from "next/link";

type Props = {};

const Page = (props: Props) => {
    const addItemToCart = (item: CartItem) => {
        // Get the current cart items from local storage
        const cartItems = localStorage.getItem("cart");
        if (cartItems !== null) {
            const parsedCartItems = JSON.parse(cartItems);
            // Add the new item to the cart
            parsedCartItems.push(item);
            // Store the updated cart items in local storage
            localStorage.setItem("cart", JSON.stringify(parsedCartItems));
            return;
        } else {
            localStorage.setItem("cart", JSON.stringify([item]));
        }
    };

    return (
        <div className="flex w-full flex-col justify-center text-center">
            <button onClick={() => addItemToCart({ quantity: 1, price: 1000 })}>
                Add item
            </button>
            <Link href="/checkout" className="">
                Checkout
            </Link>
        </div>
    );
};

export default Page;
