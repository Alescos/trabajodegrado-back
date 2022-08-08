import { Equipment, EquipmentInput } from '../../db/entity/Equipment';
import { EquipmentService } from '../../db/services/EquipmentService';
export class EquipmentController {
  constructor(private equimentService: EquipmentService) {
    this.equimentService = new EquipmentService();
  }

  getAllEquipments(id: string) {
    const equipments = this.equimentService.getEquipments(id);
    return equipments;
  }

  create(payload: EquipmentInput) {
    let {
      name,
      branch,
      model,
      type,
      alias,
      serial,
      purchasedAt,
      status,
      area,
      classEquipment,
      image,
    } = payload;
    if (alias === undefined) {
      alias = name;
    }

    const newEquipment = new Equipment();
    newEquipment.name = name;
    newEquipment.branch = branch;
    newEquipment.model = model;
    newEquipment.alias = alias!;
    newEquipment.serial = serial;
    newEquipment.purchasedAt = purchasedAt;
    newEquipment.type = type;
    newEquipment.status = status;
    newEquipment.area = area;
    newEquipment.classEquipment = classEquipment;
    newEquipment.image = image != null ? (image as string) : '';
    const res = this.equimentService.create(newEquipment);
    return res;
  }

  getEquipmentById(id: string) {
    const equipment = this.equimentService.getEquipmentById(id);
    return equipment;
  }
}
