import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Chat {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    message!: string;

    @CreateDateColumn({ type: 'timestamp' }) 
    createdAt!: Date;

    @Column({ nullable: false })
    createdBy!: string; 
}
