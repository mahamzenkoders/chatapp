import { getCookieFn } from '@/utils/storage.util';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { IoIosPersonAdd } from 'react-icons/io';
import { Input } from './ui/input';
import io from 'socket.io-client';
import { Friend } from '@/types/Interfaces/addfriend';

const AddFriend = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [search, setSearch] = useState<string>('');

  const handleClick = (id: string, name: string) => {
    const token = getCookieFn('accessToken');
    const user = getCookieFn('currentUser');
    const userObject = user && JSON.parse(user);
    const firstName = userObject.firstName;
    const socket = io('https://zenchat-backend-vnhm.onrender.com', {
      extraHeaders: {
        authorization: `Bearer ${token}`,
      },
    });

    console.log('hello');

    socket.emit(
      'CREATE_ROOM',
      {
        type: 'direct',
        participants: [id],
        name: `${name} & ${firstName} Chat`,
      },
      (res: any) => {
        console.log(res);
      },
    );
  };

  const fetchUsers = async () => {
    try {
      const token = getCookieFn('accessToken');
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users/search/${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setFriends(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='m-3'>
      <Input
        type='text'
        placeholder='Search for friends...'
        value={search}
        onChange={e => setSearch(e.target.value)}
        className='mb-4'
      />
      {friends.map(friend => (
        <div
          className='flex items-center gap-2 mb-4 justify-between'
          key={friend.id}
        >
          <div className='flex items-center gap-4 text-white'>
            <Avatar>
              <AvatarImage src='https://github.com/shadcn.png' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>
              {friend.firstName} {friend.lastName}
            </p>
          </div>
          <div>
            <IoIosPersonAdd
              onClick={() => {
                handleClick(friend.id, friend.firstName);
              }}
              className='h-9 w-9 text-slate-400 cursor-pointer'
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddFriend;
