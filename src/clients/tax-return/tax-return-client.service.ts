import { Injectable } from '@nestjs/common';
import {
  SubmissionDto,
  taxReturnControllerGetLatestSubmission,
} from '@clients/tax-return';
import { fetchConfig } from './client-config';

@Injectable()
export class TaxReturnClientService {
  async getLatestSubmission(ssn: string): Promise<SubmissionDto | undefined> {
    const { data } = await taxReturnControllerGetLatestSubmission({
      ...fetchConfig,
      path: {
        ssn: ssn,
      },
    });

    return data;
  }
}
