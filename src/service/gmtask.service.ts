import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {GmTask} from '../entity/gmtask.entity';
import {Repository} from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GmTaskService {
  constructor(@InjectRepository(GmTask) private readonly gmTaskRepository:Repository<GmTask> ){

  }

  async create(data:any):Promise<GmTask> {

    return this.gmTaskRepository.save(data);
  }

  async findOne(condition:any):Promise<GmTask>{
    return this.gmTaskRepository.findOne(condition);
  }

  async findAll():Promise<GmTask[]>{
    return this.gmTaskRepository.createQueryBuilder('p')
    .select(['p.id','p.taskuuid', 'p.title','p.description','p.status']).getMany();
  }
  async remove(id: number): Promise<void> {
    await this.gmTaskRepository.delete(id);
  }
  async update(id: string,title:string,description:string,status:string): Promise<any> {
       await this.gmTaskRepository.update(id,
      {'title':title,'description':description,'status':status}
    );
    return {'status':'updated successfully'};
  }
}