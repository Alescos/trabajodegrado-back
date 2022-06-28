import { AppDataSource } from '../config';
import { Area, AreaInput } from '../entity/Area';

export default class AreaService {
  areaRepository = AppDataSource.getRepository(Area);

  async getAreaById(id: number) {
    try {
      const result = await this.areaRepository
        .createQueryBuilder('areas')
        .where('areas.id = :id', { id: id })
        .getOne();
      return result;
    } catch (error) {
      console.log('Error en servicio');
      return error;
    }
  }

  async getAreasFromOrganization(id: number) {
    try {
      const result = await this.areaRepository
        .createQueryBuilder('areas')
        .where('areas.organizationId = :id', { id: id })
        .getMany();
      return result;
    } catch (error) {
      console.log('Error en servicio');
      return error;
    }
  }

  async createArea(area: AreaInput) {
    try {
      const result = await this.areaRepository
        .createQueryBuilder('areas')
        .insert()
        .into(Area)
        .values([
          {
            name: area.name,
            description: area.description,
            phone: area.phone,
            organization: area.organization,
          },
        ])
        .execute();
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
