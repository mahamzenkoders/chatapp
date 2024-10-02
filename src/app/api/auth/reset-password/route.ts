import { NextRequest, NextResponse } from 'next/server';
import { getDataSource } from '@/source/data.source';
import { User } from '@/app/entity/User';
import bcrypt from 'bcrypt';

export const POST = async (req: NextRequest) => {
  try {
    const { email, newPass } = await req.json();
    const connection = await getDataSource();
    const userRepository = connection.getRepository(User);
    const user = await userRepository.findOneBy({ email });
    if (!user) {
      return NextResponse.json({
        message: "User Doesn't Exist",
      });
    }
    const hashedPassword = await bcrypt.hash(newPass, 10);
    user.password = hashedPassword;
    await userRepository.save(user);
    return NextResponse.json({
      message: 'Password Updated successfully',
    });
  } catch (err) {
    console.log(err);
  }
};
