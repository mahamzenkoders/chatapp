import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Room {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false }) 
    name!: string; 

    @Column({ nullable: false }) 
    createdAt!: Date;

    @Column({ nullable: false }) 
    createdBy!: string;

}
