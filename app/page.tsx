import Navbar from "../components/Navbar";

export default function Home() {
    return (
        <main className=" text-white  overflow-x-hidden">

            <Navbar />

            {/* ===== CINEMATIC OPENING ===== */}
            <section className="h-screen flex items-center justify-center  sticky top-0 z-10">
                <h1 className="text-7xl md:text-9xl font-bold tracking-widest ">
                    URBAN THREAD
                </h1>
            </section>



            {/* ===== PREMIUM HERO ===== */}
            <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 relative overflow-hidden">

                {/* small top tag */}
                <p className="text-xs tracking-[0.35em] text-gray-500 mb-6">
                    URBAN THREAD — SPRING SUMMER 2026
                </p>

                {/* main heading */}
                <h2 className="text-4xl md:text-6xl font-semibold max-w-4xl leading-tight">
                    Discover fashion that defines confidence,
                    individuality and modern street culture
                </h2>

                {/* description */}
                <p className="text-gray-400 mt-6 max-w-xl text-sm md:text-base">
                    Explore premium western wear designed for everyday luxury.
                    From statement streetwear to minimal essentials,
                    Urban Thread brings you curated collections that elevate
                    your personal style effortlessly.
                </p>

                {/* ===== BUTTONS ===== */}
                <div className="flex gap-6 mt-12">

                    {/* SHOP COLLECTION */}
                    <button className="relative px-10 py-4 rounded-full overflow-hidden group border border-white">

                        {/* animated fill */}
                        <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-left transition duration-500"></span>

                        {/* text */}
                        <span className="relative z-10 text-white group-hover:text-black transition duration-500 font-medium tracking-wide">
                            Shop New Collection
                        </span>

                    </button>

                    {/* EXPLORE LOOKBOOK */}
                    <button className="relative px-10 py-4 rounded-full overflow-hidden group border border-white/40">

                        {/* glow background */}
                        <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-white/10 via-white/20 to-white/10 blur-sm"></span>

                        {/* text */}
                        <span className="relative z-10 text-white group-hover:tracking-widest transition duration-500 font-medium">
                            Explore Lookbook
                        </span>

                    </button>

                </div>

                {/* ===== EXTRA CONTENT BELOW ===== */}
                <div className="flex gap-16 mt-20 text-center">

                    <div className="group">
                        <h3 className="text-3xl font-semibold group-hover:scale-110 transition">
                            500+
                        </h3>
                        <p className="text-gray-500 text-sm">Premium Designs</p>
                    </div>

                    <div className="group">
                        <h3 className="text-3xl font-semibold group-hover:scale-110 transition">
                            12K+
                        </h3>
                        <p className="text-gray-500 text-sm">Happy Customers</p>
                    </div>

                    <div className="group">
                        <h3 className="text-3xl font-semibold group-hover:scale-110 transition">
                            4.9★
                        </h3>
                        <p className="text-gray-500 text-sm">Customer Rating</p>
                    </div>

                </div>

            </section>
            {/* ===== TRENDING FITS PREMIUM ===== */}
            <section className=" py-24">

                {/* heading */}
                <div className="text-center mb-16">
                    <p className="text-gray-500 text-xs tracking-[0.4em] mb-3">
                        FEATURED COLLECTION
                    </p>
                    <h2 className="text-4xl font-semibold tracking-wide">
                        Trending Fits
                    </h2>
                </div>

                {/* cards */}
                <div className="flex justify-center">
                    <div className="flex gap-10 overflow-x-auto px-10 scrollbar-hide">

                        {[
                            "https://plus.unsplash.com/premium_photo-1667520043080-53dcca77e2aa",
                            "https://as2.ftcdn.net/v2/jpg/03/94/12/75/1000_F_394127586_By1lJqdngMNghU07gUf4KD170mzjzNd0.jpg",
                            "https://img.freepik.com/free-photo/high-fashion-portrait-young-beautiful-brunette-woman-wearing-nice-trendy-red-evening-fluffy-dress-sexy-fashion-model-posing-studio-fashionable-female-isolated-blue_158538-22206.jpg",
                            "https://as2.ftcdn.net/v2/jpg/07/70/55/91/1000_F_770559106_j78PYl5CeNyfkos39zCmiKTyQCzwxeDe.jpg",
                            "https://img.freepik.com/free-photo/young-pretty-woman-listening-music-wireless-earphones_1303-20585.jpg",
                        ].map((img, i) => (
                            <div
                                key={i}
                                className="min-w-[260px] h-[380px] rounded-t-[140px] rounded-b-[30px] overflow-hidden relative group cursor-pointer"
                            >
                                {/* image */}
                                <img
                                    src={img}
                                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                                />

                                {/* dark gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition"></div>

                                {/* glass bottom panel */}
                                <div className="absolute bottom-0 left-0 right-0 p-5 backdrop-blur-md bg-white/5 opacity-0 group-hover:opacity-100 transition duration-500">

                                    <h3 className="text-lg tracking-wide">
                                        Urban Fit {i + 1}
                                    </h3>

                                    <p className="text-gray-300 text-sm mt-1">
                                        Premium streetwear collection
                                    </p>

                                    <button className="mt-3 text-xs tracking-widest border-b border-white pb-1 hover:tracking-[0.3em] transition">
                                        VIEW PRODUCT
                                    </button>

                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </section>
            {/* ===== FASHION VISUAL SECTION ===== */}
            <section className="min-h-screen text-white px-16 py-28">

                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">

                    {/* LEFT IMAGE (smaller + elegant) */}
                    <div className="relative group flex justify-center">
                        <img
                            src="https://thumbs.dreamstime.com/b/friends-fashion-gen-z-people-portrait-diversity-relax-sidewalk-casual-cool-young-students-urban-streetwear-style-287578630.jpg"
                            className="w-[400px] h-[600px] object-cover rounded-[35px] shadow-xl 
        group-hover:scale-105 transition duration-700"
                        />

                        {/* floating tag */}
                        <div className="absolute bottom-5 left-10 bg-black/60 backdrop-blur px-4 py-2 rounded-lg">
                            <p className="text-xs tracking-widest">URBAN COLLECTION</p>
                        </div>
                    </div>

                    {/* RIGHT TEXT */}
                    <div>
                        <p className="text-xs tracking-[0.5em] text-gray-500 mb-6">
                            STYLE EVOLUTION
                        </p>

                        <h2 className="text-4xl md:text-5xl font-semibold leading-tight">
                            Designed for confidence,
                            <span className="block mt-2">built for everyday luxury</span>
                        </h2>

                        <p className="text-gray-400 mt-8 leading-relaxed">
                            Urban Thread creates fashion that reflects individuality and modern
                            confidence. Our collections blend minimal luxury with contemporary
                            streetwear to elevate everyday styling.
                        </p>

                        <p className="text-gray-500 mt-4 text-sm leading-relaxed">
                            Every piece is thoughtfully crafted to ensure comfort, versatility
                            and bold expression for the new generation of fashion enthusiasts.
                        </p>

                        {/* horizontal line */}
                        <div className="mt-10 w-20 h-[1px] bg-white/30"></div>

                        {/* small note */}
                        <p className="mt-6 text-sm text-gray-400 italic">
                            Crafted for those who wear confidence daily.
                        </p>
                    </div>

                </div>
            </section>



            {/* ===== CONTACT / FOOTER ===== */}
            <section className="min-h-screen flex flex-col justify-center items-center text-center px-6">

                {/* heading */}
                <p className="text-xs tracking-[0.4em] text-gray-500 mb-4">
                    CONNECT WITH US
                </p>

                <h2 className="text-4xl md:text-5xl font-semibold mb-6">
                    Stay Connected
                </h2>

                {/* description */}
                <p className="text-gray-400 max-w-md">
                    We are here to help you with orders, styling and support.
                    Reach out to us anytime.
                </p>

                {/* contact details */}
                <div className="mt-10 space-y-3 text-gray-300">

                    <p>
                        Email:
                        <span className="text-gray-400 ml-2">support@urbanthread.com</span>
                    </p>

                    <p>
                        Phone:
                        <span className="text-gray-400 ml-2">+91 98765 43210</span>
                    </p>

                    <p>
                        Customer Care:
                        <span className="text-gray-400 ml-2">Mon – Sat, 10AM – 7PM</span>
                    </p>

                    <p>
                        Location:
                        <span className="text-gray-400 ml-2">New Delhi, India</span>
                    </p>

                </div>

                {/* socials */}
                <div className="flex gap-10 mt-10 text-gray-400 text-sm">
                    <span className="hover:text-white transition cursor-pointer">Instagram</span>
                    <span className="hover:text-white transition cursor-pointer">Pinterest</span>
                    <span className="hover:text-white transition cursor-pointer">Twitter</span>
                </div>

                {/* divider */}
                <div className="w-24 h-[1px] bg-white/20 mt-16"></div>

                {/* footer */}
                <p className="text-gray-500 text-xs mt-6">
                    © 2026 Urban Thread. All rights reserved.
                </p>

            </section>



        </main>
    );
}
