import { CartItem } from "@/types/cart";
import Link from "next/link";
import { useState } from "react";

type Props = {};

const Page = (props: Props) => {
    const start = [
        { quantity: 1, price: 1000 },
        { quantity: 3, price: 2000 },
        { quantity: 2, price: 1000 },
    ];
    const [items, setItems] = useState<CartItem[]>(start);

    const addItemToCart = (item: CartItem) => {
        // Get the current cart items from local storage
        const cartItems = localStorage.getItem("cart");
        if (cartItems === null) {
            return;
        }

        const parsedCartItems = JSON.parse(cartItems);
        // Add the new item to the cart
        parsedCartItems.push(item);
        // Store the updated cart items in local storage
        localStorage.setItem("cart", JSON.stringify(parsedCartItems));

    };

    return (
        <div>
            <Link href="/checkout" />
        </div>
    );
};

export default Page;
