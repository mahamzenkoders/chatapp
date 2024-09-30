
import { User } from '@/app/entity/User';
import { getDataSource } from '@/source/data.source';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (_req: NextRequest) => {
  const connection = await getDataSource();

  return NextResponse.json(
    await connection.getRepository(User).find(),
  );
};