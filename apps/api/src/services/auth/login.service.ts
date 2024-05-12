import prisma from "@/prisma";
import { User } from "@prisma/client";
import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";
import { comparePassword } from "@/lib/bcrypt";
import { JWT_SECRET } from "@/config";

export const loginService = async (body: Pick<User, "email" | "password">) => {
    try {
        const { email, password } = body;
        const user = await prisma.user.findFirst({
            where: { email },
        });

        if (!user) {
            throw new Error("Invalid email address");
        }

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }

        const token = sign({ id: user.id }, JWT_SECRET, {
            expiresIn: '2h',
        });

        return {
            message: "Login success",
            data: user,
            token,
        };
    } catch (error) {
        throw error;
    }
}