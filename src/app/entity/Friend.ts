import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Friend {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: string;

  @Column()
  friendId!: number;
}
