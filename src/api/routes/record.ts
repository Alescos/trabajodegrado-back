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

export default router;
