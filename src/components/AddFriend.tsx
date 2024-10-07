import { getCookieFn } from '@/utils/storage.util';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { IoIosPersonAdd } from 'react-icons/io';
import { Input } from './ui/input';
import { Friend } from '@/types/Interfaces/addfriend';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { socket } from '@/app/socket/socketconfig';

interface AddFriendProps {
  closeDialog: () => void;
}

const AddFriend: React.FC<AddFriendProps> = ({ closeDialog }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [search, setSearch] = useState<string>('');

  const handleClick = (id: string, name: string) => {
    const token = getCookieFn('accessToken');
    const user = getCookieFn('currentUser');
    let firstName = '';
    let userObject;
    try {
      userObject = user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error parsing user cookie:', error);
      userObject = null;
    }

    const userId = userObject?.id;

    try {
      const userObject = user ? JSON.parse(user) : null;
      firstName = userObject?.firstName || 'User';
    } catch (error) {
      console.error('Error parsing user object:', error);
      firstName = 'User';
    }

    console.log('Creating room for:', name, firstName);

    socket.emit(
      'CREATE_ROOM',
      {
        createdBy: userId,
        participants: [id],
        roomName: `${name} ${firstName} Chat`,
      },
      (res: any) => {
        toast.success('Friend Added Successfully', {
          position: 'top-center',
          transition: Bounce,
        });
        console.log(res);
        closeDialog();
      },
    );
  };

  const fetchUsers = async () => {
    if (!search) {
      setFriends([]);
      setLoading(false);
      return;
    }

    try {
      const token = getCookieFn('accessToken');
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/search/${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(res.data);
      if (Array.isArray(res.data)) {
        setFriends(res.data);
      } else {
        console.error('Unexpected response structure:', res.data);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search]);

  if (loading) {
    return (
      <div className='gap-4 flex flex-col'>
        <Input
          type='text'
          placeholder='Search for friends...'
          value={search}
          onChange={e => setSearch(e.target.value)}
          className='mb-4'
        />
        <div>Loading...</div>
      </div>
    );
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
      {friends.length > 0 ? (
        friends.map(friend => (
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
                onClick={() => handleClick(friend.id, friend.firstName)}
                className='h-9 w-9 text-slate-400 cursor-pointer'
              />
            </div>
          </div>
        ))
      ) : (
        <div className='text-white'>No friends found</div>
      )}
    </div>
  );
};

export default AddFriend;
