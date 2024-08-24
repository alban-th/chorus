import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  UpdateDateColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Pokemon } from './pokemon.entity';

@Entity()
export class Profile extends BaseEntity {
  @Column()
  name: string;

  @ManyToMany(() => Pokemon)
  @JoinTable()
  pokemons: Pokemon[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
