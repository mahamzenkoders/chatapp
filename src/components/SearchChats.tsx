import React, { useEffect, useState } from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import axios from 'axios';
import { getCookieFn } from '@/utils/storage.util';
import { SkeletonChat } from './skeletons/chatSkeleton';
import { SkeletonSearch } from './skeletons/searchskeleton';
import { Chats } from '@/types/Interfaces/chat.interface';
import { useRouter } from 'next/navigation';
import { socket } from '@/app/socket/socketconfig';

const SearchChats = () => {
  const [chats, setChats] = useState<Chats[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleRoom = (roomID: string, roomName: string) => {
    const token = getCookieFn('accessToken');

    socket.emit(
      'JOIN_SINGLE_ROOM',
      {
        type: 'direct',
        roomId: roomID,
      },
      (res: any) => {
        console.log(res);
      },
    );
    router.push(`?id=${roomID}&name=${roomName}`);
  };

  const fetchRooms = async () => {
    try {
      const token = getCookieFn('accessToken');
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/rooms`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      setChats(res.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  if (loading) {
    return (
      <div>
        <div>
          <SkeletonSearch />
        </div>
        <div className='mt-8'>
          <SkeletonChat />
          <SkeletonChat />
          <SkeletonChat />
          <SkeletonChat />
          <SkeletonChat />
          <SkeletonChat />
        </div>
      </div>
    );
  }

  return (
    <div className=''>
      <Command>
        <CommandInput
          className='text-gray-300'
          placeholder='Search'
        />
        <CommandList className='my-4 '>
          {chats.length === 0 ? (
            <CommandEmpty>No results found.</CommandEmpty>
          ) : (
            <CommandGroup heading=''>
              <div className='space-y-1'>
                {chats?.map(chat => (
                  <div
                    onClick={() => {
                      handleRoom(chat.id, chat.name);
                    }}
                  >
                    <CommandItem key={chat.id}>
                      {' '}
                      <div className='bg-gray-800 text-white hover:bg-slate-600 p-3 rounded w-full border flex items-center gap-2 border-gray-300'>
                        <Avatar>
                          <AvatarImage src='https://github.com/shadcn.png' />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        {chat.name}
                      </div>
                    </CommandItem>
                  </div>
                ))}
              </div>
            </CommandGroup>
          )}
        </CommandList>
      </Command>
    </div>
  );
};

export default SearchChats;
