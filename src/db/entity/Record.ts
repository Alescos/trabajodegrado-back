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
import { Equipment } from './Equipment';

export interface RecordInput {
  id?: number;
  equipment: string;
  reportDate: Date;
  organization: string;
  area: string;
  areaName: string;
  equipmentName: string;
  user: string;
  description: string;
  type: string;
  priority?: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface RecordOutput {
  id?: number;
  equipment: string;
  reportDate: Date;
  user: string;
  organization: string;
  area: string;
  areaName: string;
  equipmentName: string;
  description: string;
  type: string;
  priority: string;
  createdAt: Date;
  updatedAt: Date;
}

@Entity('records')
export class Record {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @OneToMany(() => Equipment, (equipment: Equipment) => equipment.id)
  equipment: string;
  @Column()
  @IsNotEmpty()
  reportDate: Date;
  @Column()
  @IsNotEmpty()
  user: string;
  @Column()
  @IsNotEmpty()
  status: string;
  @Column()
  @IsNotEmpty()
  description: string;
  @Column()
  @IsNotEmpty()
  area: string;
  @Column()
  @IsNotEmpty()
  areaName: string;
  @Column()
  @IsNotEmpty()
  equipmentName: string;
  @Column()
  @IsNotEmpty()
  type: string;
  @Column()
  @IsNotEmpty()
  organization: string;
  @Column()
  @IsNotEmpty()
  priority: string;
  @CreateDateColumn()
  createdAt?: Date;
  @UpdateDateColumn()
  updatedAt?: Date;
  @DeleteDateColumn()
  deletedAt?: Date;
}
