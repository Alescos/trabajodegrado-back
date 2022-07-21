import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { IsEmail, IsNotEmpty, Min } from 'class-validator';
import { Organization } from './Organization';

export interface UserInput {
  id?: number;
  email: string;
  name: string;
  organization: Organization;
  role: number;
  phone: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface UserOutput {
  id?: number;
  email: string;
  name: string;
  phone: string;
  role: number;
  organization: number;
}

@Entity('users')
@Index(['email'], { unique: true })
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @Column()
  @IsNotEmpty()
  name: string;
  @Column()
  phone: string;
  @Column()
  role: number;
  @Column()
  @Min(8)
  @IsNotEmpty()
  password: string;
  @ManyToOne(
    () => Organization,
    (organization: Organization) => organization.id,
    {
      cascade: true,
    }
  )
  organization: Organization;
  @CreateDateColumn()
  createdAt?: Date;
  @UpdateDateColumn()
  updatedAt?: Date;
  @DeleteDateColumn()
  deletedAt?: Date;
}
