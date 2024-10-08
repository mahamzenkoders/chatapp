import { Friend } from '@/app/entity/Friend';
import { getDataSource } from '@/source/data.source';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const { userId, friendId } = await req.json();

    const connection = await getDataSource();
    const friend = connection.getRepository(Friend);
    const friendData = new Friend();
    friendData.userId = userId;
    friendData.friendId = friendId;

    const savedFriend = friend.save(friendData);
    return NextResponse.json(friendData);
  } catch (err) {
    return NextResponse.json({
      message: 'ERROR CREATING FRIENDS',
    });
  }
};
