import {NextResponse} from "next/server";
import { Prisma } from "@/app/generated/prisma";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

type SignupBody = {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
};

export async function POST(request: Request) {
    let body: SignupBody;

    try {
        body = (await request.json()) as SignupBody;
    } catch {
        return NextResponse.json({error: "Invalid JSON body"}, {status: 400});
    }

    const email = typeof body.email === "string" ? body.email.trim() : undefined;
    //TODO: remove trim() after password validation
    const password = typeof body.password === "string" ? body.password.trim() : undefined;
    const firstName = typeof body.firstName === "string" ? body.firstName.trim() : undefined;
    const lastName = typeof body.lastName === "string" ? body.lastName.trim() : undefined;

    if (!email || !password || !firstName || !lastName) {
        return NextResponse.json({error: "Email, password, first name, and last name are required"}, {status: 400});
    }

    const normalizedEmail = email.toLowerCase();

    try {
        const passwordHash = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email: normalizedEmail,
                passwordHash,
                firstName,
                lastName,
            }, select: {
                id: true,
                email: true,
                role: true,
                createdAt: true,
            },
        });
        return NextResponse.json({message: "User created", userId: user.id}, {status: 201});

    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002" //prisma error: "Unique constraint failed on the {constraint}"
        ) {
            return NextResponse.json(
                { error: "Email already in use" }, { status: 409 }
            );
        }
        return NextResponse.json(
            { error: "Internal server error" }, { status: 500 }
        );
    }
}