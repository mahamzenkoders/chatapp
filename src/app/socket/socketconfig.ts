import { getCookieFn } from "@/utils/storage.util";
import { io } from "socket.io-client";

const token = getCookieFn('accessToken');
export const socket = io('https://zenchat-backend-vnhm.onrender.com', {
    extraHeaders: {
      authorization: `Bearer ${token}`,
    },
  });

  