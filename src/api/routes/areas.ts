import express from 'express';
import { AreaInput } from '../../db/entity/Area';
import AreaService from '../../db/services/AreaService';
import { AreaController } from '../controllers/areaController';

const router = express.Router();
const service = new AreaService();
const areaController = new AreaController(service);

router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const area: any = await areaController.getOne(id);
    res.status(200).json({
      name: area.name,
      description: area.description,
      phone: area.phone,
      location: area.location,
      createdAt: area.createdAt,
    });
  } catch (error) {
    res.status(404).json({
      message: 'Organization not found',
      description: error,
    });
  }
});

router.get('/getAll/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const areas = await areaController.getAll(id);
    if (areas) {
      res.status(200).json({
        data: areas,
      });
    }
  } catch (error) {
    res.status(404).json({
      message: 'Organization not found',
      description: error,
    });
  }
});

router.post('/register', async (req, res) => {
  try {
    const payload: AreaInput = {
      name: req.body.name,
      description: req.body.description,
      phone: req.body.phone,
      organization: req.body.organization,
      location: req.body.location,
    };
    const result = await areaController.create(payload);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
});

export default router;
