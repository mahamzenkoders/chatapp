import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Room } from './Room';
import { User } from './User';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Room, room => room.messages, { lazy: true })
  room!: Promise<Room>;

  @ManyToOne(() => User, user => user.messages, { lazy: true })
  sender!: Promise<User>;

  @Column('text')
  text!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}
