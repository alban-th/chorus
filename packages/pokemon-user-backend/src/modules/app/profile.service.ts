import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from '../database/entities';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './create-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>
  ) {}

  findAll(): Promise<Profile[]> {
    return this.profileRepository.find();
  }

  async create(dto: CreateProfileDto): Promise<Profile> {
    const newProfile = this.profileRepository.create({
      ...dto,
    });
    await newProfile.save();

    return newProfile;
  }
}
