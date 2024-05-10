import { hashPassword } from "@/lib/bcrypt";
import prisma from "@/prisma";
import { Prisma, User } from "@prisma/client";
import cuid from "cuid";

export const registerService = async (
  body: Pick<
    User,
    "firstName" | "lastName" | "email" | "password" | "referralCode"
  >
) => {
    try {
        const { firstName, lastName, email, password, referralCode } =  body;
        const exitingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (exitingUser) {
            throw new Error("Email already exist");
        }

        const hashedPassword = await hashPassword(password);
        const newUser = await prisma.$transaction(async (transaction) => {
            const newReferralCode = cuid();
            const user = await transaction.user.create({
                data: { 
                    firstName, 
                    lastName, 
                    email, 
                    password: hashedPassword, 
                    referralCode: newReferralCode 
                },
            });

            await transaction.userDetail.create({
                data: { 
                    userId: user.id, 
                    role: 'customer', 
                    isVerified: false 
                },
            });

            await transaction.point.create({
                data: { 
                    userId: user.id, 
                    totalPoint: 0, 
                    earnDate: null, 
                    expiredDate: null 
                },
            });

            if (!referralCode) {
                return user;
            } else {
                const referredUser = await prisma.user.findFirst({
                    where: { referralCode },
                    include: {
                        point: true,
                        userDetail: true,
                    },
                });

                if (referredUser?.userDetail?.role === "event_organizer") {
                    throw new Error ("Can't use Event Organizer's referral code");
                }

                if (!referredUser) {
                    throw new Error ("Referral code not found or invalid");
                } else {
                    const earnDate = new Date();
                    const currentPoint = referredUser.point?.totalPoint || BigInt(0);
                    const currentExpiredDate = referredUser.point?.expiredDate || null;

                    let expiredDate;
                    if (currentExpiredDate === null) {
                        expiredDate = new Date(
                            earnDate.getTime() + (90 * 24 * 60 * 60 * 1000)
                        );
                    } else {
                        expiredDate = new Date(
                            // currentExpiredDate.getTime() + (90 * 24 * 60 * 60 * 1000)
                            earnDate.getTime() + (90 * 24 * 60 * 60 * 1000)
                        );
                    }

                    await prisma.point.update({
                        where: { userId: referredUser.id },
                        data: {
                          totalPoint: currentPoint + BigInt(10000),
                          earnDate: new Date(Date.now()),
                          expiredDate: expiredDate,
                        },
                    });
          
                    await transaction.reward.create({
                        data: {
                          userId: user.id,
                          title: "Discount 10%",
                          nominal: 2000,
                        },
                    });
                    
                }                
            }
        });

        return { 
            message: "Registration success",
            data: newUser,
        };
    } catch (error) {
        throw error;
    }
};
