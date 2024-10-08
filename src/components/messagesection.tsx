import React, { useEffect, useRef, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';
import { SendHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { getCookieFn } from '@/utils/storage.util';
import axios from 'axios';
import { socket } from '@/app/socket/socketconfig';
import { SendMessage } from '@/types/Interfaces/send.message';

const MessageSection = () => {
  const token = getCookieFn('accessToken');
  const searchParams = useSearchParams();
  const roomID = searchParams.get('id');
  const roomName = searchParams.get('name');
  const user = getCookieFn('currentUser');

  let userObject;
  try {
    userObject = user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error parsing user cookie:', error);
    userObject = null;
  }

  const userId = userObject?.id;
  const [sendmsg, setSendMsg] = useState<SendMessage[]>([]);
  const [input, setInput] = useState<string>('');

  const responseMessage = async () => {
    if (roomID) {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/messages/room/${roomID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setSendMsg(res.data);
    }
  };

  useEffect(() => {
    responseMessage();

    if (roomID) {
      console.log(`Joining room: ${roomID}`);
      socket.emit('JOIN_SINGLE_ROOM', { roomId: roomID });
    }

    return () => {
      console.log(`Leaving room: ${roomID}`);
    };
  }, [roomID]);

  useEffect(() => {
    socket.on('RECEIVE_MESSAGES', (res: { message: SendMessage }) => {
      console.log('Received message:', res);
      setSendMsg(prev => [...prev, res.message]);
    });

    return () => {
      socket.off('RECEIVE_MESSAGES OFF');
    };
  }, []);

  const handleClick = () => {
    if (input) {
      const messageData = { roomId: roomID, message: input, senderId: userId };
      socket.emit('NEW_MESSAGE', messageData, (response: boolean) => {
        if (response) {
          console.log('Message sent successfully');
        } else {
          console.error('Failed to send message');
        }
      });

      setInput('');
    }
  };

  return (
    <div className='flex flex-col justify-between h-full'>
      <div>
        <div className='bg-gray-800 flex items-center border-b border-gray-600 p-4'>
          <Avatar className='mr-3'>
            <AvatarImage
              src='https://github.com/shadcn.png'
              alt='@shadcn'
              className='rounded-full'
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className='text-white text-lg font-semibold'>{roomName}</h1>
        </div>

        <div className='flex flex-col space-y-2 p-4 overflow-y-auto h-[calc(100vh-150px)] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200'>
          {sendmsg.map((sendmsgs, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${
                userId === sendmsgs.senderId
                  ? 'self-end bg-blue-600 text-white'
                  : 'bg-gray-600 text-white self-start'
              } max-w-xs`}
            >
              <p>{sendmsgs.message}</p>
              <span className='text-xs text-gray-300'>
                {new Date(sendmsgs.createdAt).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className='flex items-center mb-5 p-5'>
        <Input
          type='text'
          placeholder='Type your message...'
          className='flex-1 p-2 rounded-lg border border-gray-300'
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <Button
          className='ml-2 rounded-lg bg-blue-500 hover:bg-blue-600'
          onClick={handleClick}
        >
          <SendHorizontal className='text-white' />
        </Button>
      </div>
    </div>
  );
};

export default MessageSection;
