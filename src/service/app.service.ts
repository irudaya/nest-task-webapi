import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from '../entity/user.entity';
import {Repository} from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(@InjectRepository(User) private readonly userRepository:Repository<User> ){

  }

  async create(data:any):Promise<User> {

    return this.userRepository.save(data);
  }

  async findOne(condition:any):Promise<User>{
    return this.userRepository.findOne(condition);
  }

  async findAll():Promise<User[]>{
    return this.userRepository.createQueryBuilder('p')
    .select(['p.name', 'p.email']).getMany();
  }
}
