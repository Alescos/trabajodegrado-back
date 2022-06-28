import { Organization, OrganizationInput } from '../../db/entity/Organization';
import OrganizationService from '../../db/services/OrganizationService';

export class OrganizationController {
  constructor(private organizationService: OrganizationService) {
    this.organizationService = new OrganizationService();
  }

  async get(id: number) {
    const organization = await this.organizationService.getOrganization(id);
    return organization;
  }

  async getAreas(id: number) {
    const areas = await this.organizationService.getAreasFromOrganization(id);
    return areas;
  }

  create(payload: OrganizationInput) {
    const { name, nit, description } = payload;
    const newOrganization = new Organization();
    newOrganization.name = name;
    newOrganization.nit = nit;
    newOrganization.description = description;
    const res = this.organizationService.createOrganization(newOrganization);
    return res;
  }
}
