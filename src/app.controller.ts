import { Controller, Body,Res,Req, Post,Get,BadRequestException} from '@nestjs/common';
import { AppService } from './service/app.service';
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { Response,Request } from 'express';
import { UnauthorizedException } from '@nestjs/common/exceptions';
@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService,private jwtService: JwtService) {}

  @Post('register')
  async register(
    @Body('name') name:string,
    @Body('email') email:string,
    @Body('password') password:string
  ){

    const hashedPassword=await bcrypt.hash(password,12);

    const user =await this.appService.create({name,
      email,
      password:hashedPassword});

      delete user.password;
      return user ;
       
  }

  @Post('login')
  async login(
    @Body('email') email:string,
    @Body('password') password:string,
    @Res({passthrough:true}) response: Response
  )
  {
    const user=await this.appService.findOne({where:{email}});

    if(!user){
      throw new BadRequestException( 'Invalid credentials');
    }
    if(!await bcrypt.compare(password,user.password)){
      throw new BadRequestException( 'Invalid credentials')
    }

    const jwt=await this.jwtService.signAsync({id:user.id});

    response.cookie('jwt',jwt,{httpOnly:true})
    return {
      message:"success",
      user:user
    }

  }

  @Get('user')
  async user(@Req() request: Request){
    try{
      const cookie=request.cookies['jwt'];
      const data=await this.jwtService.verifyAsync(cookie);
    
      if(!data){
        throw new UnauthorizedException();
      }
     
      const user=await this.appService.findOne({where:{id:data['id']}});
      const {password,...result}=user;
      return result ;
    }
    catch(e){
      throw new UnauthorizedException();
    }
   
  }

  @Get('userlist')
  async userlist(@Req() request: Request){
    try{
      const cookie=request.cookies['jwt'];
      const data=await this.jwtService.verifyAsync(cookie);
      if(!data){
        throw new UnauthorizedException();
      }
      const users=await this.appService.findAll();
      
      return users;

    }catch(e){
      throw new UnauthorizedException();
    }

  }

  @Post('logout')
  async logout(@Res({passthrough:true})response: Response){

    response.clearCookie('jwt');

    return {message:'sucess'}

  }

}
