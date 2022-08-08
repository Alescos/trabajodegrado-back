import { AppDataSource } from '../config';
import { Equipment, EquipmentInput } from '../entity/Equipment';

export class EquipmentService {
  equipmentrepository = AppDataSource.getRepository(Equipment);

  async getEquipmentById(id: string) {
    try {
      const result = await this.equipmentrepository
        .createQueryBuilder('equipments')
        .where('equipments.id = :id', { id: id })
        .getOne();
      return result;
    } catch (error) {
      console.log('Error en servicio');
      return error;
    }
  }

  async getEquipments(id: string) {
    try {
      const res = await this.equipmentrepository
        .createQueryBuilder('equipments')
        .where('equipments.area = :id', { id: id })
        .getMany();
      return res;
    } catch (error) {
      return error;
    }
  }

  async create(equipment: EquipmentInput) {
    try {
      const result = await this.equipmentrepository
        .createQueryBuilder('equipments')
        .insert()
        .into(Equipment)
        .values([
          {
            name: equipment.name,
            branch: equipment.branch,
            model: equipment.model,
            type: equipment.type,
            alias: equipment.alias,
            serial: equipment.serial,
            purchasedAt: equipment.purchasedAt,
            status: equipment.status,
            classEquipment: equipment.classEquipment,
            area: equipment.area,
            image: equipment.image,
          },
        ])
        .execute();
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
