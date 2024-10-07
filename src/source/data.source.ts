import { Friend } from '../app/entity/Friend';
import { Message } from '../app/entity/Message';
import { Room } from '../app/entity/Room';
import { User } from '../app/entity/User';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'zenkoders',
  database: 'zen_chat',
  synchronize: true,
  logging: true,
  entities: [User, Message, Room,Friend],
  subscribers: [],
  migrations: [],
});

export const getDataSource = async (): Promise<DataSource> => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource;
};
