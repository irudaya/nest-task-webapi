import {Entity, Column,PrimaryGeneratedColumn} from 'typeorm';

@Entity('gmtasks')
export class GmTask{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique:true})
    taskuuid:string;

    @Column({unique:true})
    title:string;

    @Column()
    description:string;

    @Column()
    status:string;
    
    @Column()
    createAt:Date;

    @Column()
    updatedAt:Date;

}