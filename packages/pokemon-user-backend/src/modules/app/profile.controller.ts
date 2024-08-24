import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateProfileDto } from './create-profile.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  async findAll() {
    const profiles = await this.profileService.findAll();
    return profiles;
  }

  @Post()
  async addProfile(@Body() createCatDto: CreateProfileDto): Promise<string> {
    try {
      const profile = await this.profileService.create(createCatDto);
      return JSON.stringify(profile);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Put(':id/pokemons/:pokemonId')
  async addPokemon(@Param() params: { id: number; pokemonId: number }) {
    try {
      const profile = await this.profileService.addPokemon(
        Number(params.id),
        Number(params.pokemonId)
      );
      return JSON.stringify(profile);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Delete(':id/pokemons/:pokemonId')
  async removePokemon(@Param() params: { id: number; pokemonId: number }) {
    try {
      const profile = await this.profileService.removePokemon(
        Number(params.id),
        Number(params.pokemonId)
      );
      return JSON.stringify(profile);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
