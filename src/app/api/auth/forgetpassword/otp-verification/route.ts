import { User } from "@/app/entity/User";
import { AppDataSource } from "@/source/data.source";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const { email, otp } = await req.json();
        if (!email || !otp) {
            return NextResponse.json(
                {
                    message: "Email and OTP are required"
                },
                { status: 400 }
            );
        }
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }

        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({ email });
        if (!user) {
            return NextResponse.json({
                message: "User not found"
            }, { status: 404 });
        }

        if (user.otp !== otp) {
            return NextResponse.json({
                message: "Invalid OTP"
            }, { status: 400 });
        }

        if (user.otpExpires && user.otpExpires < new Date()) {
            return NextResponse.json({
                message: "OTP has expired"
            }, { status: 400 });
        }

        user.otp = undefined; 
        user.otpExpires = undefined; 
        await userRepository.save(user); 

        return NextResponse.json({ message: "OTP verified successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error verifying OTP:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
};
