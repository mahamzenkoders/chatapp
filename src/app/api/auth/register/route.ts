import { NextResponse, NextRequest } from 'next/server';
import { getDataSource } from '@/source/data.source';
import bcrypt from 'bcrypt';
import { User } from '@/app/entity/User';
import jwt from 'jsonwebtoken';

export const POST = async (req: NextRequest) => {
  try {
    const { email, password, firstName, lastName } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and Password required' },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User();
    user.email = email;
    user.password = hashedPassword;
    user.firstName = firstName;
    user.lastName = lastName;

    const connection = await getDataSource();
    const userRepository = connection.getRepository(User);
    await userRepository.save(user);
    const accessToken = jwt.sign({ id: user.id }, 'maham', { expiresIn: '1h' });
    return NextResponse.json({
      message: 'User Created',
      accessToken,
      currentUser: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    console.error('Error creating user:', error);

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
};
