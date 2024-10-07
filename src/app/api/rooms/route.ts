import { Room } from '@/app/entity/Room';
import { getDataSource } from '@/source/data.source';
import { JwtPayload } from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken'

export const GET = async(req: NextRequest) => {
  try{
    const auth = req.headers.get('Authorization');

    if(!auth||!auth.startsWith("Bearer"))
    {
      return NextResponse.json({
        "message":"Unauthorized "
      })
    }

    const token = auth.split(" ")[1];
    const data = await jwt.verify(token, 'maham') as JwtPayload;

    console.log(data.id)

    const connection=await getDataSource();
    const rooms = await connection.getRepository(Room).find({
      where: [
        { participantId: data.id },
        { createdBy: data.id }
      ]
    });
    return NextResponse.json(rooms);
  }
  catch(err)
  {
    console.log("Error Fetching Rooms",err)
  }
};
