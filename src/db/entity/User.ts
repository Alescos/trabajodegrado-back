import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { IsEmail, IsNotEmpty, Min } from 'class-validator';

export interface UserInput {
  id?: number;
  email: string;
  name: string;
  phone: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
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
  @Min(8)
  @IsNotEmpty()
  password: string;
  /* @ManyToOne(
    () => Organization,
    (organization: Organization) => organization.id
  )
  organization: Organization; */
  @CreateDateColumn()
  createdAt?: Date;
  @UpdateDateColumn()
  updatedAt?: Date;
  @DeleteDateColumn()
  deletedAt?: Date;
}
