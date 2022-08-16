import { AppDataSource } from '../config';
import { Record, RecordInput } from '../entity/Record';

export class RecordService {
  recordRepository = AppDataSource.getRepository(Record);

  async getRecordById(id: string) {
    try {
      const result = await this.recordRepository
        .createQueryBuilder('records')
        .where('records.id = :id', { id: id })
        .getOne();
      return result;
    } catch (error) {
      console.log('Error en servicio');
      return error;
    }
  }

  async getReportsByArea(id: string) {
    try {
      /* const result = await this.recordRepository
        .createQueryBuilder('records')
        .where('records.organization = :id', { id: id })
        .addSelect('SUM(records.type)', 'sum')
        .groupBy('record.area')
        .getMany(); */
      /* const [list, result] = await this.recordRepository.findAndCount({
        where: {
          organization: id,
        },
      }); */
      const data = await this.recordRepository
        .createQueryBuilder('records')
        .select(['records.areaName', 'Count(records.id)'])
        .groupBy('records.areaName')
        .getRawMany();
      return data;
    } catch (error) {
      return error;
    }
  }

  async getRecords(id: string) {
    try {
      const res = await this.recordRepository
        .createQueryBuilder('records')
        .where('records.organization = :id', { id: id })
        .getMany();
      return res;
    } catch (error) {
      return error;
    }
  }

  async create(record: RecordInput) {
    try {
      const result = await this.recordRepository
        .createQueryBuilder('records')
        .insert()
        .into(Record)
        .values([
          {
            equipment: record.equipment,
            reportDate: record.reportDate,
            user: record.user,
            description: record.description,
            type: record.type,
            organization: record.organization,
            status: record.status,
            area: record.area,
            areaName: record.areaName,
            equipmentName: record.equipmentName,
            priority: record.priority,
          },
        ])
        .execute();
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
