import express from 'express';
import { EquipmentInput, EquipmentOutput } from '../../db/entity/Equipment';
import { EquipmentService } from '../../db/services/EquipmentService';
import { EquipmentController } from '../controllers/equipmentController';
import upload from '../middleware/fileUploadMiddleware';
const path = require('path');
const fs = require('fs');

const router = express.Router();
const equipment = new EquipmentService();
const equipmentController = new EquipmentController(equipment);

router.get('/getAll/:id', async (req, res) => {
  const id = req.params.id;
  const equipments = await equipmentController.getAllEquipments(id);
  if (equipments) {
    res.status(200).json({
      data: equipments,
      message: 'Respuesta de usuarios',
    });
  }
});

router.post('/register', async (req, res) => {
  try {
    const payload: EquipmentInput = req.body;
    const equipment: any = await equipmentController.create(payload)!;
    res.status(200).json({
      name: equipment.name,
      branch: equipment.branch,
      model: equipment.model,
      type: equipment.type,
      alias: equipment.alias,
      purchasedAt: equipment.purchasedAt,
      status: equipment.status,
      classEquipment: equipment.classEquipment,
      area: equipment.area,
      image: equipment.image,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  let equipment: EquipmentOutput;
  const response = await equipmentController.getEquipmentById(id);
  response ? (equipment = response as EquipmentOutput) : null;
  res.status(200).json({
    name: equipment!.name,
    branch: equipment!.branch,
    model: equipment!.model,
    type: equipment!.type,
    alias: equipment!.alias,
    purchasedAt: equipment!.purchasedAt,
    status: equipment!.status,
    classEquipment: equipment!.classEquipment,
    area: equipment!.area,
    image: equipment!.image,
    createdAt: equipment!.createdAt,
    updatedAt: equipment!.updatedAt,
  });
});

router.post('/:id/images', upload.single('images', 9999), async (req, res) => {
  const id = req.params.id;
  const filename = req.file?.filename;
  const temPath = req.file?.path;
  const targetPath = path.join(__dirname, `../../images/equipments/${id}`);
  fs.mkdir(targetPath, { recursive: true }, (err: Error) => {
    console.log(err);
  });
  const dest = `${targetPath}/${filename}`;
  /* const src = fs.createReadStream(temPath);
  const dest = fs.createWriteStream(`${targetPath}/${filename}`); */

  fs.rename(temPath, dest, (err: Error) => {
    if (err) throw err;
    console.log('Rename complete!');
  });
  res.status(200).json({
    newPath: dest!,
  });
});

export default router;
