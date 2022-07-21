import { Equipment, EquipmentInput } from '../../db/entity/Equipment';
import { EquipmentService } from '../../db/services/EquipmentService';
type FileNameCallback = (error: Error | null, filename: string) => void;
export class EquipmentController {
  multer = require('multer');
  path = require('path');

  // type DestinationCallback = (error: Error | null, destination: string) => void;

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
      history,
      area,
      classEquipment,
      image,
    } = payload;
    if (history === undefined) {
      history = '1';
    }
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
    newEquipment.history = history!;
    newEquipment.area = area;
    newEquipment.classEquipment = classEquipment;
    newEquipment.image = image ? (image as string) : '';
    const res = this.equimentService.create(newEquipment);
    return res;
  }

  getEquipmentById(id: string) {
    const equipment = this.equimentService.getEquipmentById(id);
    return equipment;
  }

  diskstorage = this.multer.diskStorage({
    destination: this.path.join(__dirname, '../images'),
    filename: (
      req: Request,
      file: Express.Multer.File,
      cb: FileNameCallback
    ): void => {
      cb(null, Date.now() + file.originalname);
    },
  });

  uploadFile = this.multer({
    storage: this.diskstorage,
  }).single('image');
}
