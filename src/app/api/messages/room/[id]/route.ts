import { NextRequest, NextResponse } from 'next/server';
import { Params } from '@/types/Interfaces/params';
import { getDataSource } from '@/source/data.source';
import { Message } from '@/app/entity/Message';

export const GET = async (req: NextRequest, { params }: { params: Params }) => {
  try {
    const { id } = params;

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

    const connection = await getDataSource()
    const messages = await connection.getRepository(Message).find({
      where: { roomId: Number(id) }, 
    });
    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error in GET request:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
};
