import { getCookieFn } from '@/utils/storage.util';
import { io } from 'socket.io-client';

const token = getCookieFn('accessToken');
export const socket = io('http://localhost:5000', {
  extraHeaders: {
    authorization: `Bearer ${token}`,
  },
});
