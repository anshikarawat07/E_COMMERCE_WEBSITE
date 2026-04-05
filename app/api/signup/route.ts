import { isDatabaseConfigured, prisma } from "@/app/lib/prisma";
import { signupFallback } from "@/app/lib/authStore";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();

        // Dev fallback (when DATABASE_URL isn't configured).
        if (!isDatabaseConfigured() || !prisma) {
            const res = await signupFallback({ name, email, password });
            if (!res.ok) return NextResponse.json({ error: res.error });
            return NextResponse.json({ success: true });
        }
        // check existing user
        const existing = await prisma.user.findUnique({
            where: { email }
        });

        if (existing) {
            return NextResponse.json({ error: "User already exists" });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // save user
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        return NextResponse.json({ success: true });

    } catch (err) {
        console.log(err);
        if (err instanceof Error) {
            // Surface misconfiguration clearly to the frontend.
            return NextResponse.json({ error: err.message });
        }
        return NextResponse.json({ error: "Server error" });
    }
}
