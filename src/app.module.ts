import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './service/app.service';
import { GmTaskService } from './service/gmtask.service';

import{User} from './entity/user.entity';
import{Task} from './entity/task.entity';
import{GmTask} from './entity/gmtask.entity';
import { JwtModule } from '@nestjs/jwt/dist';
import { TasksController } from './tasks/tasks.controller';
import { ReportsController } from './users/reports/reports.controller';

@Module({
  imports: [TypeOrmModule.forRoot({
    type:'mysql',
    host:'localhost',
    port:3306,
    username:'root',
    password:'root',
    database:'world',
    entities:[User,Task,GmTask],
    synchronize:true
  }),
  TypeOrmModule.forFeature([User,GmTask]),
  
  JwtModule.register({
    secret:"secret",
    signOptions:{expiresIn:'1d'}
  })
],
  controllers: [AppController, TasksController, ReportsController],
  providers: [AppService,GmTaskService],
})
export class AppModule {}
