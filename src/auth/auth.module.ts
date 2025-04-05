import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: UserRepository,
      useFactory: (DataSource: DataSource) => {
        const baseRepo = DataSource.getRepository(User);
        Object.setPrototypeOf(baseRepo, UserRepository.prototype);
        return baseRepo;
      },
      inject: [DataSource],
    },
  ],
})
export class AuthModule {}
