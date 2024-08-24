import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { CreateProfileDto } from './create-profile.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  async findAll(): Promise<string> {
    const profiles = await this.profileService.findAll();
    return JSON.stringify(profiles);
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
}
