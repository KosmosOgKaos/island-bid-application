import { Injectable } from '@nestjs/common';
import {
  taxReturnControllerGetLatestSubmission,
  taxReturnControllerCreateSubmission,
  CreateSubmissionDto,
  SubmissionResponseDto,
} from '@clients/tax-return';
import { fetchConfig } from './client-config';

@Injectable()
export class TaxReturnClientService {
  async getLatestSubmission(
    ssn: string,
  ): Promise<SubmissionResponseDto | undefined> {
    const { data } = await taxReturnControllerGetLatestSubmission({
      ...fetchConfig,
      path: {
        ssn: ssn,
      },
    });

    return data;
  }

  async createSubmission(
    ssn: string,
    submission: CreateSubmissionDto,
  ): Promise<SubmissionResponseDto | undefined> {
    try {
      const response = await taxReturnControllerCreateSubmission({
        ...fetchConfig,
        path: {
          ssn: ssn,
        },
        body: submission,
      });

      const { data } = response;

      if (!data) {
        console.error('No data received from API');
      }

      return data;
    } catch (error) {
      console.error('Error in createSubmission:', error);
      throw error;
    }
  }
}
