import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Message } from './Message';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, nullable: false })
  email!: string;

  @Column({ nullable: false })
  password!: string;

  @Column({ nullable: false })
  firstName!: string;

  @Column({ nullable: false })
  lastName!: string;

  @Column({ nullable: true })
  otp?: string;

  @Column({ type: 'timestamp', nullable: true })
  otpExpires?: Date;

  @OneToMany(() => Message, message => message.sender, { lazy: true })
  messages!: Promise<Message[]>;
}
