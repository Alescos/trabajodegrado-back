import express from 'express';
import { RecordInput } from '../../db/entity/Record';
import { RecordService } from '../../db/services/RecordService';
import { RecordController } from '../controllers/recordController';

const router = express.Router();
const service = new RecordService();
const recordController = new RecordController(service);

router.get('/getAll/:id', async (req, res) => {
  const id = req.params.id;
  const records = await recordController.getAllRecords(id);
  if (records) {
    res.status(200).json({
      data: records,
      message: 'Registros',
    });
  }
});

router.get('/byArea/:id', async (req, res) => {
  const id = req.params.id;
  const data = await recordController.getRecordsByArea(id);
  if (data) {
    res.status(200).json({
      value: data,
      message: 'Registros por Area',
    });
  }
});
router.get('/byType/:id', async (req, res) => {
  const id = req.params.id;
  const data = await recordController.getRecordsByType(id);
  if (data) {
    // res.send(data);
    res.status(200).json({
      value: data,
      message: 'Registros por Tipo',
    });
  }
});
router.get('/byDate/:id', async (req, res) => {
  const id = req.params.id;
  const data = await recordController.getRecordsByDate(id);
  console.log(data);
  if (data) {
    // res.send(data);
    res.status(200).json({
      value: data,
      message: 'Registros por Fecha',
    });
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const record = await recordController.getRecord(id);
  if (record) {
    res.status(200).json({
      data: record,
      message: `Resultado del registro ${id}`,
    });
  }
});

router.post('/register', async (req, res) => {
  try {
    const payload: RecordInput = req.body;
    const record = await recordController.create(payload);
    res.status(200).json({
      data: record,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post('/update', async (req, res) => {
  req.headers.authorization;
  res.send('Guardando registro');
});

router.get('/:id/TypesByArea', async (req, res) => {
  const id = req.params.id;
  const records = await recordController.getRecordsByTypeByArea(id);
  if (records) {
    res.status(200).json({
      value: records,
      message: `Resultado de la organización ${id}`,
    });
  } else {
    res.status(402).json({
      message: 'No se han encontrado registros',
    });
  }
});

export default router;
