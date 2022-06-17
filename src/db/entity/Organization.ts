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

export interface OrganizationInput {
  id?: number;
  name: string;
  nit: number;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface OrganizationOutput {
  id: number;
  name: string;
  nit: number;
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
  nit: number;
  @Column()
  description: string;
  @OneToMany(() => Area, (area) => area)
  areas: Area[];
  @CreateDateColumn()
  createdAt?: Date;
  @UpdateDateColumn()
  updatedAt?: Date;
  @DeleteDateColumn()
  deletedAt?: Date;
}
