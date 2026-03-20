import { isDatabaseConfigured, prisma } from "@/lib/prisma";
import { loginFallback } from "@/lib/authStore";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Enter email & password" });
        }

        // Dev fallback (when DATABASE_URL isn't configured).
        if (!isDatabaseConfigured() || !prisma) {
            const res = await loginFallback({ email, password });
            if (!res.ok) return NextResponse.json({ error: res.error });
            return NextResponse.json({
                message: "Login success",
                token: res.token,
                name: res.name,
            });
        }

        // find user
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" });
        }

        // check password
        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            return NextResponse.json({ error: "Wrong password" });
        }

        // create token
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            "urbanthreadsecret",
            { expiresIn: "1d" }
        );

        return NextResponse.json({
            message: "Login success",
            token,
            name: user.name,
        });

    } catch (err) {
        console.log(err);
        if (err instanceof Error) {
            return NextResponse.json({ error: err.message });
        }
        return NextResponse.json({ error: "Server error" });
    }
}
