"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {

    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const [errors, setErrors] = useState<any>({});
    const [msg, setMsg] = useState("");

    const validate = () => {
        let newErrors: any = {};

        if (!name) newErrors.name = "Enter username";

        if (!email) newErrors.email = "Enter email";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            newErrors.email = "Invalid email format";

        if (!password) newErrors.password = "Enter password";
        else if (password.length < 6)
            newErrors.password = "Min 6 characters";
        else if (!/^(?=.*[A-Za-z])(?=.*\d)/.test(password))
            newErrors.password = "Must contain letter + number";

        if (confirm !== password)
            newErrors.confirm = "Passwords not match";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignup = async () => {

        const isValid = validate();

        if (!isValid) {
            setMsg("Fill above details correctly");
            return;
        }

        setMsg("Creating account...");

        try {
            const res = await fetch("/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            });

            const data = await res.json();

            if (data.error) {
                setMsg(data.error);
            } else {
                setMsg("Account created successfully ");

                // redirect to login
                setTimeout(() => {
                    router.push("/login");
                }, 800);
            }

        } catch (err) {
            console.log(err);
            setMsg("Server error. Try again.");
        }
    };


    return (
        <div className="h-screen flex items-center justify-center bg-[#0b0b0b] text-white overflow-hidden px-6">

            <div className="max-w-5xl w-full h-[620px] grid md:grid-cols-2 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">

                {/* LEFT IMAGE */}
                <div className="hidden md:block relative">
                    <img
                        src="https://www.bringitonline.in/uploads/2/2/4/5/22456530/good-vibes-only-creative-photography-12_orig.jpg"
                        className="h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-10">
                        <h1 className="text-3xl font-semibold tracking-widest">
                            URBAN THREAD
                        </h1>
                        <p className="text-gray-300 text-sm mt-2">
                            Premium Streetwear for modern generation
                        </p>
                    </div>
                </div>

                {/* RIGHT FORM */}
                <div className="bg-[#111] p-10 flex flex-col justify-center">

                    <h2 className="text-3xl font-semibold mb-2">
                        Join the Fashion Community
                    </h2>

                    <p className="text-gray-400 text-sm mb-8">
                        Create your account and explore premium fashion
                    </p>

                    {/* username */}
                    <div className="mb-3">
                        <input
                            type="text"
                            placeholder="Username"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={`w-full px-4 py-3 bg-transparent border rounded-lg outline-none 
                            ${errors.name ? "border-red-500" : "border-white/20"}`}
                        />
                        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                    </div>

                    {/* email */}
                    <div className="mb-3">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full px-4 py-3 bg-transparent border rounded-lg outline-none 
                            ${errors.email ? "border-red-500" : "border-white/20"}`}
                        />
                        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    </div>

                    {/* password */}
                    <div className="mb-3">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full px-4 py-3 bg-transparent border rounded-lg outline-none 
                            ${errors.password ? "border-red-500" : "border-white/20"}`}
                        />
                        {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                    </div>

                    {/* confirm */}
                    <div className="mb-6">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            className={`w-full px-4 py-3 bg-transparent border rounded-lg outline-none 
                            ${errors.confirm ? "border-red-500" : "border-white/20"}`}
                        />
                        {errors.confirm && <p className="text-red-400 text-xs mt-1">{errors.confirm}</p>}
                    </div>

                    {/* button */}
                    <button
                        onClick={handleSignup}
                        className="w-full py-3 bg-white text-black rounded-lg font-semibold hover:scale-[1.02] transition"
                    >
                        Create Account
                    </button>

                    {msg && (
                        <p className="text-sm text-center mt-4 text-gray-300">{msg}</p>
                    )}

                    <p className="text-gray-400 text-sm text-center mt-8">
                        Already have account?
                        <span
                            onClick={() => router.push("/login")}
                            className="ml-2 text-white underline cursor-pointer"
                        >
                            Log in
                        </span>
                    </p>

                </div>
            </div>
        </div>
    );
}
