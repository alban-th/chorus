import { Module } from '@nestjs/common';

import { ProfileModule } from './profile/profile.module';
import { PokemonModule } from './pokemon/pokemon.module';
import { DbModule } from '../database/db.module';

@Module({
  imports: [ProfileModule, PokemonModule, DbModule],
})
export class AppModule {}
