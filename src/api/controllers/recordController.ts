import { Record, RecordInput } from '../../db/entity/Record';
import AreaService from '../../db/services/AreaService';
import { RecordService } from '../../db/services/RecordService';
export class RecordController {
  constructor(private recordService: RecordService) {
    this.recordService = new RecordService();
  }

  getAllRecords(id: string) {
    const records = this.recordService.getRecords(id);
    return records;
  }

  getRecordsByArea(id: string) {
    const records = this.recordService.getReportsByArea(id);
    return records;
  }

  create(payload: RecordInput) {
    let {
      equipment,
      organization,
      reportDate,
      user,
      description,
      type,
      priority,
      area,
      areaName,
      equipmentName,
    } = payload;

    const areaService = new AreaService();
    const newRecord = new Record();
    newRecord.equipment = equipment;
    newRecord.reportDate = reportDate;
    newRecord.user = user;
    newRecord.status = 'Activo';
    newRecord.description = description!;
    newRecord.type = type;
    newRecord.organization = organization;
    newRecord.priority = priority!;
    newRecord.area = area;
    newRecord.equipmentName = equipmentName;
    const res = areaService
      .getAreaById(parseInt(area))
      .then((data: any) => {
        areaName = data.name;
        newRecord.areaName = areaName;
      })
      .then(() => {
        this.recordService.create(newRecord);
      });

    return res;
  }

  getRecord(id: string) {
    const record = this.recordService.getRecordById(id);
    return record;
  }

  getRecordsByType(id: string) {
    const data = this.recordService.getReportsByType(id);
    return data;
  }

  getRecordsByDate(id: string) {
    const data = this.recordService.getsAllReportsByDate(id);
    return data;
  }

  getRecordsByTypeByArea(id: string) {
    const data = this.recordService.getReportsByTypeByArea(id);
    return data;
  }
}
