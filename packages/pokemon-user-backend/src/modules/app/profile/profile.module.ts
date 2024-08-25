import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { Pokemon, Profile } from '../../database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Profile, Pokemon])],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
