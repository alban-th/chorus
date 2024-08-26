import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateProfileDto } from './create-profile.dto';
import { Pokemon, Profile } from '../../database/entities';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    @InjectRepository(Pokemon)
    private pokemonRepository: Repository<Pokemon>
  ) {}

  async findAll(): Promise<Profile[]> {
    const profiles = await this.profileRepository.find({
      relations: ['pokemons'],
      order: { id: 'DESC' },
    });
    return profiles;
  }

  async findOne(id: number): Promise<Profile> {
    try {
      const profile = await this.profileRepository.find({
        where: { id },
        relations: ['pokemons'],
      });
      return profile[0];
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async create(dto: CreateProfileDto): Promise<Profile> {
    const newProfile = this.profileRepository.create({
      ...dto,
    });
    await newProfile.save();

    return newProfile;
  }

  async addPokemon(profileId: number, pokemonId: number): Promise<Profile> {
    const profile = await this.profileRepository.findOne({
      where: { id: profileId },
      relations: ['pokemons'], // Load the courses relation for the student
    });

    if (!profile) {
      throw new Error(`No Profile found with the provided ID ${profileId}`);
    }

    const pokemon = await this.pokemonRepository.findOne({
      where: { id: pokemonId },
    });

    if (!pokemon) {
      throw new Error('No Pokemon found with the provided IDs');
    }

    if (
      profile.pokemons.length < 6 &&
      !profile.pokemons.find((p) => p.id === pokemon.id)
    ) {
      profile.pokemons.push(pokemon);
    }

    return this.profileRepository.save(profile); // Save the updated student
  }

  async removePokemon(profileId: number, pokemonId: number): Promise<Profile> {
    const profile = await this.profileRepository.findOne({
      where: { id: profileId },
      relations: ['pokemons'], // Load the courses relation for the student
    });

    if (!profile) {
      throw new Error(`No Profile found with the provided ID ${profileId}`);
    }

    profile.pokemons = profile.pokemons.filter((p) => p.id !== pokemonId);

    return this.profileRepository.save(profile); // Save the updated student
  }
}
