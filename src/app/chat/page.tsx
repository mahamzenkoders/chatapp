'use client';
import React, { useEffect } from 'react';
import SearchChats from '@/components/SearchChats';
import { useState } from 'react';
import io from 'socket.io-client';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import AddFriend from '@/components/AddFriend';
import { getCookieFn } from '@/utils/storage.util';
import MessageSection from '@/components/messagesection';

const token = getCookieFn('accessToken');
const socket = io('https://zenchat-backend-vnhm.onrender.com', {
  extraHeaders: {
    authorization: `Bearer ${token}`,
  },
});

const Chat = () => {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected');
    });

    return () => {
      socket.off('disconnect', () => {
        console.log('disconnected');
      });

      socket.off('connect', () => {
        console.log('connection off');
      });
    };
  }, []);

  return (
    <main className='h-screen bg-gray-200 flex'>
      <div className='w-[30%] bg-gray-800 p-6 shadow-md h-full overflow-y-auto  scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200'>
        <Dialog>
          <DialogTrigger className='bg-blue-600 text-white p-2 w-full rounded mb-8'>
            Add Friend
          </DialogTrigger>
          <DialogContent className='bg-slate-700'>
            <AddFriend />
          </DialogContent>
        </Dialog>
        <h2 className='font-bold mb-4 text-white text-lg'>All Chats</h2>
        <SearchChats />
      </div>

      <div className='w-[70%] bg-gray-700 flex flex-col h-full'>
        <MessageSection />
      </div>
    </main>
  );
};

export default Chat;
