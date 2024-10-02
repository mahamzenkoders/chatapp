import { NextRequest, NextResponse } from 'next/server';

export const GET = (req: NextRequest) => {
  const auth = req.headers.get('Authorization');
  if (!auth || !auth.startsWith('Bearer')) {
    return NextResponse.json({
      message: '',
    });
  }
};
