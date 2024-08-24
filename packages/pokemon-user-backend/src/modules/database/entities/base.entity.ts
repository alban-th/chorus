import {
  BaseEntity as TypeORMBase,
  PrimaryGeneratedColumn,
} from 'typeorm';

export class BaseEntity extends TypeORMBase {
  @PrimaryGeneratedColumn({ type: 'int' })
  public id: number;
}
