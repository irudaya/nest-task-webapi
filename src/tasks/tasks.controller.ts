import { Controller, Body,Res,Req, Post,Get,Put,Param,Delete, BadRequestException} from '@nestjs/common';
import { AppService } from '../service/app.service';
import { GmTaskService } from 'src/service/gmtask.service';
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { Response,Request } from 'express';

import { UnauthorizedException } from '@nestjs/common/exceptions';
import { GmTask } from 'src/entity/gmtask.entity';

@Controller('api/tasks')
export class TasksController {
    constructor(private readonly appService: AppService,private readonly gmTaskService: GmTaskService,private jwtService: JwtService) {}

    @Get('tasklist')
  async tasklist(@Req() request: Request){
    try{
      const cookie=request.cookies['jwt'];
      const data=await this.jwtService.verifyAsync(cookie);
      if(!data){
        throw new UnauthorizedException();
      }
      const tasks=await this.gmTaskService.findAll();
      console.log(tasks.length);
      return tasks;

    }catch(e){
      throw new UnauthorizedException();
    }

  }

  @Post('inserttask')
  async inserttask(@Req() request: Request,
    @Body('taskuuid') taskuuid:string,
    @Body('title') title:string,
    @Body('description') description:string,
    @Body('status') status:string,
    @Body('createAt') createAt:Date,
    @Body('updatedAt') updatedAt:Date,

  ){
    try{
      const cookie=request.cookies['jwt'];
      const data=await this.jwtService.verifyAsync(cookie);
      if(!data){
        throw new UnauthorizedException();
      }
        const task =await this.gmTaskService.create({taskuuid, title, description,status,createAt,updatedAt});
        return task ;
      }catch(e){
        throw new UnauthorizedException();
      }

       
  }
  @Delete(':id')
  async deletetask(@Req() request: Request, @Param('id') id:number)
  {
    try{
      const cookie=request.cookies['jwt'];
      const data=await this.jwtService.verifyAsync(cookie);
      if(!data){
        throw new UnauthorizedException();
      }
      const task =await this.gmTaskService.remove(id);
      return {'message':'record deleted successfully'} ;

    }catch(e){
      throw new UnauthorizedException();
    } 
  }

  @Post('updatettask')
  async updatetask( @Req() request: Request,@Body('id') id:string,
  @Body('title') title:string,
  @Body('description') description:string,
  @Body('status') status:string,
  @Body('createAt') createAt:Date,
  @Body('updatedAt') updatedAt:Date){
    
    try{
      const cookie=request.cookies['jwt'];
      const data=await this.jwtService.verifyAsync(cookie);
      if(!data){
        throw new UnauthorizedException();
      }
      return   this.gmTaskService.update(id,title,description,status);
    }catch(e){
      throw new UnauthorizedException();
    } 
  }

}
