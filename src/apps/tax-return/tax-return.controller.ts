import { Body, Controller, Get, Post } from '@nestjs/common';
import { CapitalizeInput } from './api-dto/capitalize.input';
import { TaxReturnService } from './tax-return.service';
import { TaxReturnClientService } from '@clients/tax-return/tax-return-client.service';

@Controller('/api')
export class TaxReturnController {
  constructor(
    private readonly demoService: TaxReturnService,
    private readonly taxReturnClient: TaxReturnClientService,
  ) {}

  @Get()
  getHello(): string {
    return this.demoService.getHello();
  }

  @Get('/randomString')
  getFakeStringData(): string {
    return this.demoService.getFakeStringData();
  }

  @Post('/capitalize')
  postCapitalizeName(@Body() capitalizeNameInput: CapitalizeInput): string {
    const { input } = capitalizeNameInput;
    return this.demoService.capitalize(input);
  }

  @Get('/taxReturn')
  async getTaxReturn() {
    const res = await this.taxReturnClient.getLatestSubmission('1203894569');
    return res;
  }
}
