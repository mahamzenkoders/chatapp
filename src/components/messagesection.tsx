import React, { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { Button } from '@/components/ui/button';
import { SendHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';

const MessageSection = () => {
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
    <div className='flex flex-col justify-between h-full'>
      <div className=''>
        <div className='bg-gray-800 p-4 flex items-center border-b border-gray-600 p-4'>
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

        <div className='flex flex-col space-y-2 p-4 overflow-y-auto '>
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
  );
};

export default MessageSection;
