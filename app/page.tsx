import Link from "next/link";

export default function Home() {
    return (
        <main className="flex items-center  flex-col w-full ">
            <Link className="flex " href="/cart">
                Go to cart
            </Link>
        </main>
    );
}
