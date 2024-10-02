import { User } from '@/app/entity/User';
import { getDataSource } from '@/source/data.source';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const POST = async (req: NextRequest) => {
  try {
    const SECRET_KEY = process.env.JWT_SECRET_KEY;
    console.log(SECRET_KEY);
    if (!SECRET_KEY) {
      return NextResponse.json(
        {
          message: 'Internal Server Error',
        },
        { status: 500 },
      );
    }
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        {
          message: 'Email & Password Required',
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
          message: 'Invalid Credentials',
        },
        { status: 401 },
      );
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return NextResponse.json(
        {
          message: 'Invalid Credentials',
        },
        { status: 401 },
      );
    }
    const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, {
      expiresIn: '1h',
    });

    return NextResponse.json(
      {
        message: 'Login Successful',
        accessToken,
        currentUser: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error logging in:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
};
