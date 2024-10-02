import { NextRequest, NextResponse } from 'next/server';
import { Params } from '@/types/Interfaces/params';
import jwt from 'jsonwebtoken';

export const GET = async (req: NextRequest, { params }: { params: Params }) => {
  try {
    const { id } = params;
    const SECRET_KEY = process.env.JWT_SECRET_KEY;

    if (!SECRET_KEY) {
      return NextResponse.json(
        {
          message: 'Internal Server Error',
        },
        { status: 500 },
      );
    }

    const auth = req.headers.get('Authorization');
    console.log(auth);

    if (!auth || !auth.startsWith('Bearer ')) {
      return NextResponse.json(
        {
          error: 'Unauthorized',
        },
        { status: 401 },
      );
    }

    const token = auth.split(' ')[1];

    let decoded;
    try {
      decoded = jwt.verify(token, SECRET_KEY);
    } catch (err) {
      console.error('Token verification failed:', err);
      return NextResponse.json(
        {
          error: 'Unauthorized',
        },
        { status: 401 },
      );
    }

    return NextResponse.json({
      message: 'Hello',
      token: token,
      id: id,
    });
  } catch (error) {
    console.error('Error in GET request:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
};
