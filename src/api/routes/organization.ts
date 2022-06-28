import express from 'express';
import { OrganizationInput } from '../../db/entity/Organization';
import OrganizationService from '../../db/services/OrganizationService';
import { OrganizationController } from '../controllers/organizationController';

const router = express.Router();
const service = new OrganizationService();
const organizationController = new OrganizationController(service);

router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const organization: any = await organizationController.get(id);
    if (organization) {
      res.status(200).json({
        name: organization.name,
        nit: organization.nit,
        description: organization.description,
        createdAt: organization.createdAt,
      });
    }
  } catch (error) {
    res.status(404).json({
      message: 'Organization not found',
      description: error,
    });
  }
});

router.get('/areas/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(id);
    const organization: any = await organizationController.getAreas(id);
    if (organization) {
      res.status(200).json({
        data: organization,
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
    const payload: OrganizationInput = {
      name: req.body.name,
      nit: req.body.nit,
      description: req.body.description,
    };
    const result = await organizationController.create(payload);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
});

export default router;
