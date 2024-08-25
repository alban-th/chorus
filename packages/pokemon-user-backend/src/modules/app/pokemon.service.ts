import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pokemon } from '../database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class PokemonService implements OnModuleInit {
  constructor(
    @InjectRepository(Pokemon)
    private pokemonRepository: Repository<Pokemon>,
  ) {}

  async onModuleInit() {
    const pokemons = await this.pokemonRepository.find();
    if (pokemons && pokemons.length === 150) {
      return;
    }

    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
    const pokemonData = await response.json();
    const newPokemons = pokemonData.results.map((pokemon) => this.pokemonRepository.create({ name: pokemon.name }));
    return this.pokemonRepository.insert(newPokemons);
  }
}
