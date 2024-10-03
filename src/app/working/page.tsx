'use client';
import React, { useEffect } from 'react';
import { io } from 'socket.io-client';

const SocketComponent = () => {
  useEffect(() => {
    const socket = io('http://localhost:5000', {
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      console.log('Socket is working');
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return <div>Socket Component</div>;
};

export default SocketComponent;
