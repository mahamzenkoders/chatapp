import { User } from '@/app/entity/User';
import { getDataSource } from '@/source/data.source';
import { NextRequest, NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { In, Like, Not } from 'typeorm';
import { Friend } from '@/app/entity/Friend';
import { Params } from '@/types/Interfaces/params';

export const GET = async (req: NextRequest, { params }: { params: Params }) => {
  try {
    const { id } = params;
    console.log(id);
    const auth = req.headers.get('Authorization');
    if (!auth || !auth.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const token = auth.split(' ')[1];
    const data = (await jwt.verify(token, 'maham')) as JwtPayload;

    const connection = await getDataSource();

    const friend = await connection.getRepository(Friend).find({
      where: { userId: data.id },
      select: ['friendId'],
    });

    const friendIds = friend.map(friend => friend.friendId);
    const numericId = parseInt(id, 10);

    const users = await connection.getRepository(User).find({
      where: [
        {
          id: Not(In([...friendIds, data.id])),
          firstName: Like(`%${id}%`),
        },
        {
          id: Not(In([...friendIds, data.id])),
          lastName: Like(`%${id}%`),
        },
      ],
      select: ['email', 'firstName', 'lastName', 'id'],
    });

    return NextResponse.json(users);
  } catch (err) {
    console.error('Error Fetching Users:', err);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
};
