import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { IsNotEmpty } from 'class-validator';

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
  /* @OneToMany(() => User, (user: User) => user.id)
  users: User[]; */
  @CreateDateColumn()
  createdAt?: Date;
  @UpdateDateColumn()
  updatedAt?: Date;
  @DeleteDateColumn()
  deletedAt?: Date;
}
