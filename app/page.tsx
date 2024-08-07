import Link from "next/link";

export default function Home() {
    return (
        <main className="flex items-center  flex-col w-full ">
            <div className="flex ">home</div>
            <Link className="flex " href="/cart">
                Go go cart
            </Link>
        </main>
    );
}
