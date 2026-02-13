export default function Login() {
    return (
        <div className="min-h-screen flex items-center justify-center text-white">

            <div className="w-[350px] border border-white/20 p-8 rounded-2xl backdrop-blur">

                <h2 className="text-3xl font-semibold text-center mb-6">
                    Login
                </h2>

                <input
                    type="email"
                    placeholder="Enter email"
                    className="w-full mb-4 px-4 py-3 bg-transparent border border-white/30 rounded-lg outline-none"
                />

                <input
                    type="password"
                    placeholder="Enter password"
                    className="w-full mb-6 px-4 py-3 bg-transparent border border-white/30 rounded-lg outline-none"
                />

                <button className="w-full py-3 bg-white text-black rounded-lg font-semibold hover:scale-105 transition">
                    Login
                </button>

            </div>

        </div>
    )
}
