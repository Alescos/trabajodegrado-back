import { IsNotEmpty } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export interface EquipmentInput {
  id?: number;
  name: string;
  branch: string;
  model: string;
  type: string;
  alias?: string;
  serial: string;
  purchasedAt: string;
  status: string;
  classEquipment: string;
  image?: string;
  area: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface EquipmentOutput {
  id?: number;
  name: string;
  branch: string;
  model: string;
  type: string;
  alias?: string;
  serial: string;
  purchasedAt: string;
  status: string;
  classEquipment: string;
  register?: string[];
  image?: string;
  area: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

@Entity('equipments')
export class Equipment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @IsNotEmpty()
  name: string;
  @Column()
  @IsNotEmpty()
  branch: string;
  @Column()
  @IsNotEmpty()
  model: string;
  @Column()
  type: string;
  @Column()
  alias: string;
  @Column()
  @Index({ unique: true })
  serial: string;
  @Column()
  purchasedAt: string;
  @Column()
  status: string;
  @Column()
  classEquipment: string;
  /* @ManyToOne(() => Record, (record: Record) => record.equipment, {
    cascade: true,
  })
  record?: string[]; */
  @Column()
  image?: string;
  @Column()
  area: string;
  @CreateDateColumn()
  createdAt?: Date;
  @UpdateDateColumn()
  updatedAt?: Date;
  @DeleteDateColumn()
  deletedAt?: Date;
}
