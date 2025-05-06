import { Module } from '@nestjs/common';
import { TaxReturnClientService } from './tax-return-client.service';

@Module({
  providers: [TaxReturnClientService],
})
export class TaxReturnClientModule {}
