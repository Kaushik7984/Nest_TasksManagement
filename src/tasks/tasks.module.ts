import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Task } from './dto/task.entity';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TasksRepository } from './tasks.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [
    TasksService,
    {
      provide: TasksRepository,
      useFactory: (dataSource: DataSource) => {
        const baseRepository = dataSource.getRepository(Task);
        Object.setPrototypeOf(baseRepository, TasksRepository.prototype);
        return baseRepository;
      },
      inject: [DataSource],
    },
  ],
})
export class TasksModule {}
