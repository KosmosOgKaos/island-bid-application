import { Injectable } from '@nestjs/common';
import {
  NationalRegistryControllerFindByKennitalaResponse,
  nationalRegistryControllerFindByKennitala,
} from './gen';
import { fetchConfig } from './client-config';
import { PersonDTO } from './dto/person.dto';

@Injectable()
export class NationalRegistryClientService {
  async getPersonByKennitala(
    kennitala: string,
  ): Promise<PersonDTO | undefined> {
    const { data } = await nationalRegistryControllerFindByKennitala({
      ...fetchConfig,
      path: {
        kennitala,
      },
    });

    if (!data) {
      return undefined;
    }

    return this.mapToPersonDTO(data);
  }

  private mapToPersonDTO(
    data: NationalRegistryControllerFindByKennitalaResponse,
  ): PersonDTO {
    return {
      name: data.name,
      kennitala: data.kennitala,
      address: data.address,
      email: data.email,
      telephone: data.telephone,
    };
  }
}

