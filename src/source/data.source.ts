import { Message } from '@/app/entity/Message';
import { Room } from '@/app/entity/Room';
import { User } from '@/app/entity/User';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.NEXT_PUBLIC_DATABASE_HOST,
  port: 3306,
  username: process.env.NEXT_PUBLIC_DATABASE_USERNAME,
  password: process.env.NEXT_PUBLIC_DATABASE_PASSWORD,
  database: process.env.NEXT_PUBLIC_DATABASE_NAME,
  synchronize: true,
  logging: true,
  entities: [User, Message, Room],
  subscribers: [],
  migrations: [],
});

export const getDataSource = async (): Promise<DataSource> => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource;
};
