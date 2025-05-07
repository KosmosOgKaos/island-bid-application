import { Injectable } from '@nestjs/common';
import { TaxReturnClientService } from '@clients/tax-return';
import { NationalRegistryClientService } from '@clients/national-registry/national-registry-client.service';
import {
  TaxReturnInfo,
  mapTaxReturnInfo,
} from './resolver-dto/tax-return-info.model';

@Injectable()
export class TaxReturnService {
  constructor(
    private readonly taxReturnClient: TaxReturnClientService,
    private readonly nationalRegistryClient: NationalRegistryClientService,
  ) {}

  async getPersonWithLatestTaxReturn(
    kennitala: string,
  ): Promise<TaxReturnInfo> {
    const person =
      await this.nationalRegistryClient.getPersonByKennitala(kennitala);
    const taxReturn = await this.taxReturnClient.getLatestSubmission(kennitala);

    return mapTaxReturnInfo(taxReturn, person, kennitala);
  }
}
