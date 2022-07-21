import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { IsEmail, IsNotEmpty } from 'class-validator';
import { Organization } from './Organization';

export interface AreaInput {
  id?: number;
  name: string;
  description: string;
  phone: string;
  organization: Organization;
  location: string;
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
  location: string;
  @Column()
  phone: string;
  @ManyToOne(() => Organization, (organization) => organization.id, {
    cascade: true,
  })
  organization: Organization;
  @CreateDateColumn()
  createdAt?: Date;
  @UpdateDateColumn()
  updatedAt?: Date;
  @DeleteDateColumn()
  deletedAt?: Date;
}
