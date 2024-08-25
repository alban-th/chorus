import { Module } from '@nestjs/common';
import { DbModule } from '../database/db.module';
import { ProfileService } from './profile.service';
import { PokemonService } from './pokemon.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pokemon, Profile } from '../database/entities';

@Module({
  imports: [DbModule, TypeOrmModule.forFeature([Profile, Pokemon])],
  controllers: [ProfileController],
  providers: [ProfileService, PokemonService],
})
export class AppModule {}
