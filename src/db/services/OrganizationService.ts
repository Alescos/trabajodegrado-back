import { AppDataSource } from '../config';
import { Organization, OrganizationInput } from '../entity/Organization';

export default class OrganizationService {
  organizationRepository = AppDataSource.getRepository(Organization);

  async getOrganization(id: number) {
    try {
      const result = await this.organizationRepository
        .createQueryBuilder('organizations')
        .where('organizations.id = :id', { id: id })
        .getOne();
      return result;
    } catch (error) {
      console.log('Error en servicio');
      return error;
    }
  }

  async createOrganization(organization: OrganizationInput) {
    try {
      const result = await this.organizationRepository
        .createQueryBuilder()
        .insert()
        .into(Organization)
        .values([
          {
            name: organization.name,
            nit: organization.nit,
            description: organization.description,
          },
        ])
        .execute();
      console.log(`resultado query ${result}`);
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
