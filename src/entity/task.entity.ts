import {Entity, Column,PrimaryGeneratedColumn} from 'typeorm';

@Entity('tasks')
export class Task{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique:true})
    taskname:string;

    @Column()
    taskdescription:string;

}

