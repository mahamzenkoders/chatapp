'use client';

import React from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const SearchChats = () => {
  const chats = [
    'Maham',
    'Saad',
    'Ali',
    'Hamza',
    'Talal',
    'Taha',
    'Muneeb',
    'Arham',
  ];

  return (
    <Command className=''>
      <CommandInput
        className='text-gray-300'
        placeholder='Search'
      />
      <CommandList className='my-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200'>
        {chats.length === 0 ? (
          <CommandEmpty>No results found.</CommandEmpty>
        ) : (
          <CommandGroup heading=''>
            <div className='space-y-1'>
              {chats.map(chat => (
                <CommandItem key={chat}>
                  <div className='bg-gray-800 text-white hover:bg-slate-600 p-3 rounded  w-full border flex items-center gap-2 border-gray-300'>
                    <Avatar>
                      <AvatarImage src='https://github.com/shadcn.png' />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    {chat}
                  </div>
                </CommandItem>
              ))}
            </div>
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );
};

export default SearchChats;
