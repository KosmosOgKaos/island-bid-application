import { Injectable } from '@nestjs/common';
import { TaxReturnClientService } from '@clients/tax-return';
import { NationalRegistryClientService } from '@clients/national-registry/national-registry-client.service';
import {
  TaxReturnInfo,
  mapTaxReturnInfo,
} from './resolver-dto/tax-return-info.model';
import { CreateSubmissionDto } from '@clients/tax-return';
import { CreateSubmissionInput } from './resolver-dto/create-submission.input';

const mapToSubmissionDto = (
  input: CreateSubmissionInput,
): CreateSubmissionDto => ({
  incomes: input.incomes.map((income) => ({ ...income })),
  properties: input.properties.map((property) => ({ ...property })),
  debts: input.debts.map((debt) => ({ ...debt })),
});

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

  async createSubmission(
    ssn: string,
    submission: CreateSubmissionInput,
  ): Promise<TaxReturnInfo> {
    const submissionDto = mapToSubmissionDto(submission);
    const taxReturn = await this.taxReturnClient.createSubmission(
      ssn,
      submissionDto,
    );
    const person = await this.nationalRegistryClient.getPersonByKennitala(ssn);
    return mapTaxReturnInfo(taxReturn, person, ssn);
  }
}
