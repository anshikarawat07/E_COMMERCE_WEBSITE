import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Enter email & password" });
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
        return NextResponse.json({ error: "Server error" });
    }
}
