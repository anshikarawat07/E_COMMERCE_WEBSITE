import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center px-10 py-5 shadow-md">
            <h1 className="text-2xl font-bold">UrbanThread</h1>

            <div className="flex gap-8 text-lg">
                <a href="#">Home</a>
                <a href="#">Women</a>
                <a href="#">Men</a>
                <a href="#">New Arrivals</a>
                <a href="#">Contact</a>
            </div>

            <div className="flex gap-4">
                <Link href="/login">
                    <button className="border px-5 py-2 rounded-full hover:bg-white hover:text-black transition">
                        Login
                    </button>
                </Link>

                <button className="bg-black text-white px-4 py-1 rounded">
                    Cart
                </button>
            </div>
        </nav>
    );
}
