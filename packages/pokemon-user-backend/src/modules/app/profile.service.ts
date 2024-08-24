import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pokemon, Profile } from '../database/entities';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './create-profile.dto';

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
    });
    return profiles;
  }

  async create(dto: CreateProfileDto): Promise<Profile> {
    const newProfile = this.profileRepository.create({
      ...dto,
    });
    await newProfile.save();

    return newProfile;
  }

  async addPokemon(profileId: number, pokemonId: number): Promise<Profile> {
    console.log(profileId, pokemonId);
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
