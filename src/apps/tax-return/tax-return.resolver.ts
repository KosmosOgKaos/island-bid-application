import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TaxReturnService } from './tax-return.service';
import { TaxReturnInfoInput } from './resolver-dto/tax-return-info.input';
import { TaxReturnInfo } from './resolver-dto/tax-return-info.model';
import { CreateSubmissionInput } from './resolver-dto/create-submission.input';

@Resolver()
export class TaxReturnResolver {
  constructor(private readonly taxReturnService: TaxReturnService) {}

  @Query(() => TaxReturnInfo, { nullable: true })
  async getLatestTaxReturnInfo(
    @Args('input') input: TaxReturnInfoInput,
  ): Promise<TaxReturnInfo | undefined> {
    const res = await this.taxReturnService.getPersonWithLatestTaxReturn(
      input.ssn,
    );
    if (res) {
      return res;
    }
    return undefined;
  }

  @Mutation(() => TaxReturnInfo)
  async createSubmission(
    @Args('ssn') ssn: string,
    @Args('input') input: CreateSubmissionInput,
  ): Promise<TaxReturnInfo | undefined> {
    return await this.taxReturnService.createSubmission(ssn, input);
  }
}
