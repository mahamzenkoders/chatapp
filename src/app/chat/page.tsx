'use client';

import { Input } from '@/components/ui/input';
import React from 'react';
import { Button } from '@/components/ui/button';
import { SendHorizontal } from 'lucide-react';
import SearchChats from '@/components/SearchChats';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState } from 'react';

const Chat = () => {
  const [sendmsg, setSendMsg] = useState<string[]>(['Hi', 'How are you?']);
  const [receiveMsg, setreceiveMsg] = useState<string[]>([
    'Hi',
    'I am good',
    'OK',
  ]);
  const [input, setInput] = useState<string>('');

  const handleClick = () => {
    if (input) {
      setSendMsg(prev => [...prev, input]);
      console.log(input);
      setInput('');
    }
  };

  return (
    <main className='h-screen bg-gray-200 flex overflow-hidden'>
      <div className='w-[30%] bg-gray-800 p-6 shadow-md'>
        <h2 className='font-bold mb-4 text-white text-lg'>All Chats</h2>
        <SearchChats />
      </div>

      <div className='w-[70%] bg-gray-700 flex flex-col h-full'>
        <div className='bg-gray-800 p-4 flex items-center justify-between border-b border-gray-600'>
          <div className='flex items-center'>
            <Avatar className='mr-3'>
              <AvatarImage
                src='https://github.com/shadcn.png'
                alt='@shadcn'
                className='rounded-full'
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className='text-white text-lg font-semibold'>Maham</h1>
          </div>
        </div>

        <div className='flex-1 overflow-y-auto p-5 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200'>
          <div className='flex flex-col space-y-2'>
            {receiveMsg.map((rmsg, index) => (
              <div
                key={index}
                className='bg-gray-600 text-white p-3 rounded-lg self-start max-w-xs'
              >
                <p>{rmsg}</p>
              </div>
            ))}
            {sendmsg.map((msg, index) => (
              <div
                key={index}
                className='bg-blue-600 text-white p-3 rounded-lg self-end max-w-xs'
              >
                <p>{msg}</p>
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
    </main>
  );
};

export default Chat;
