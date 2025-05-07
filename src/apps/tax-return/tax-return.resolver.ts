import { Args, Query, Resolver } from '@nestjs/graphql';
import { TaxReturnService } from './tax-return.service';
import { TaxReturnInfoInput } from './resolver-dto/tax-return-info.input';
import { TaxReturnInfo } from './resolver-dto/tax-return-info.model';

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
}
