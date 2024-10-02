import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { getDataSource } from '@/source/data.source';
import { User } from '@/app/entity/User';

export const POST = async (req: NextRequest) => {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json(
        {
          message: 'Email is required',
        },
        { status: 400 },
      );
    }

    const connection = await getDataSource();

    const userRepository = connection.getRepository(User);
    const user = await userRepository.findOneBy({ email });
    if (!user) {
      return NextResponse.json(
        {
          message: 'User not found',
        },
        { status: 404 },
      );
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    await userRepository.save(user);

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'OTP for Password Reset',
      text: `Your OTP is: ${otp}. It is valid for 5 minutes.`,
    });

    return NextResponse.json(
      { message: 'OTP sent to your email' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error sending OTP:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
};
