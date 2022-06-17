import { Area, AreaInput } from '../../db/entity/Area';
import AreaService from '../../db/services/AreaService';

export class AreaController {
  constructor(private areaService: AreaService) {
    this.areaService = new AreaService();
  }

  async getOne(id: number) {
    const area = await this.areaService.getAreaById(id);
    return area;
  }

  async getAll() {
    const areas = await this.areaService.getAreas();
    return areas;
  }

  create(payload: AreaInput) {
    const { name, description, phone, organization } = payload;
    const newArea = new Area();
    newArea.name = name;
    newArea.description = description;
    newArea.phone = phone;
    newArea.organization = organization;
    const res = this.areaService.createArea(newArea);
    return res;
  }
}