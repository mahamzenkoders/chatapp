import { Entity, PrimaryGeneratedColumn, Column, } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  message!:string

  @Column()
  createdAt!:Date;

  @Column()
  roomId!:number

  @Column()
  senderId!:number
}
