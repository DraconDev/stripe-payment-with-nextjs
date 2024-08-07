import { CartItem } from "@/types/cart";

export function getCartItems(): CartItem[] {
    const cartItems = localStorage.getItem("cart");
    if (cartItems === null) {
        return [];
    }
    return JSON.parse(cartItems);
}

export function emptyCart(): void {
    localStorage.removeItem("cart");
}
