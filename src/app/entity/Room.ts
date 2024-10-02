import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { User } from './User';
import { Message } from './Message';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToMany(() => User)
  @JoinTable()
  participants!: User[];

  @OneToMany(() => Message, message => message.room, { lazy: true })
  messages!: Promise<Message[]>;
}
