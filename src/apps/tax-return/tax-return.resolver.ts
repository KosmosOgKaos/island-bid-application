import { Args, Query, Resolver } from '@nestjs/graphql';
import { CapitalizeInput } from './resolver-dto/capitalize.model';
import { TaxReturnService } from './tax-return.service';
import { TaxReturnClientService } from '@clients/tax-return/';
import { TaxReturnInfoInput } from './resolver-dto/tax-return-info.input';
import {
  mapTaxReturnInfo,
  TaxReturnInfo,
} from './resolver-dto/tax-return-info.model';

@Resolver()
export class TaxReturnResolver {
  constructor(
    private readonly taxReturnService: TaxReturnService,
    private readonly taxReturnClient: TaxReturnClientService,
  ) {}

  getHello(): string {
    return this.taxReturnService.getHello();
  }

  @Query(() => String)
  getRandomString(): string {
    return this.taxReturnService.getFakeStringData();
  }

  @Query(() => String)
  capitalize(@Args('input') input: CapitalizeInput): string {
    return this.taxReturnService.capitalize(input.input);
  }

  @Query(() => TaxReturnInfo, { nullable: true })
  async getLatestTaxReturnInfo(
    @Args('input') input: TaxReturnInfoInput,
  ): Promise<TaxReturnInfo | undefined> {
    const res = await this.taxReturnClient.getLatestSubmission(input.ssn);
    if (res) {
      return mapTaxReturnInfo(res);
    }
    return undefined;
  }
}
