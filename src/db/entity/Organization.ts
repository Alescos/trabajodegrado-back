import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { IsNotEmpty } from 'class-validator';
import { Area } from './Area';
import { User } from './User';

export interface OrganizationInput {
  id?: number;
  name: string;
  nit: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface OrganizationOutput {
  id: number;
  name: string;
  nit: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

@Entity('organizations')
// @Index(['email'], { unique: true })
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @Column()
  nit: string;
  @Column()
  description: string;
  @OneToMany(() => Area, (area) => area)
  areas: Area[];
  @OneToMany(() => User, (user) => user)
  user: User[];
  @CreateDateColumn()
  createdAt?: Date;
  @UpdateDateColumn()
  updatedAt?: Date;
  @DeleteDateColumn()
  deletedAt?: Date;
}
