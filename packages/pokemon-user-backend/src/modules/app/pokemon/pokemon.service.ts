import { Repository } from 'typeorm';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Pokemon } from '../../database/entities';

@Injectable()
export class PokemonService implements OnModuleInit {
  constructor(
    @InjectRepository(Pokemon)
    private pokemonRepository: Repository<Pokemon>
  ) {}

  async findAll() {
    return this.pokemonRepository.find({ order: { id: 'ASC' } });
  }

  async onModuleInit() {
    const pokemons = await this.pokemonRepository.find();
    if (pokemons && pokemons.length > 0) {
      return;
    }

    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
    const pokemonData = await response.json();
    const newPokemons = pokemonData.results.map((pokemon) =>
      this.pokemonRepository.create({ name: pokemon.name })
    );
    return this.pokemonRepository.insert(newPokemons);
  }
}
