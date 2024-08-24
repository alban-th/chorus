import { Module } from '@nestjs/common';
import { DbModule } from '../database/db.module';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from '../database/entities';

@Module({
  imports: [DbModule, TypeOrmModule.forFeature([Profile])],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class AppModule {}
