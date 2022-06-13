import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { IsEmail, IsNotEmpty, Min } from 'class-validator';
import { Organization } from './Organization';

export interface AreaInput {
  id?: number;
  email: string;
  name: string;
  phone: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

@Entity('areas')
export class Area {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @IsEmail()
  @IsNotEmpty()
  name: string;
  @Column()
  @IsNotEmpty()
  description: string;
  @Column()
  phone: string;
  @Column()
  @Min(8)
  @IsNotEmpty()
  password: string;
  @ManyToOne(
    () => Organization,
    (organization: Organization) => organization.id
  )
  organization_id: Organization;
  @CreateDateColumn()
  createdAt?: Date;
  @UpdateDateColumn()
  updatedAt?: Date;
  @DeleteDateColumn()
  deletedAt?: Date;
}
