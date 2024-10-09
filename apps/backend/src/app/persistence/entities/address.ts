import {
  Column,
  Entity
} from 'typeorm';
import { BaseEntity } from './base.entity';


@Entity()
export class Address extends BaseEntity {
  @Column({length:"255"})
  value: string;
}
