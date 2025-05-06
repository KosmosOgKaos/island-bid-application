import { Args, Query, Resolver } from '@nestjs/graphql';
import { CapitalizeInput } from './resolver-dto/capitalize.model';
import { TaxReturnService } from './tax-return.service';

@Resolver()
export class TaxReturnResolver {
  constructor(private readonly taxReturnService: TaxReturnService) {}

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
}
