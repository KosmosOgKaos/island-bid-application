import { Module } from '@nestjs/common';
import { NationalRegistryClientService } from './national-registry-client.service';

@Module({
  providers: [NationalRegistryClientService],
  exports: [NationalRegistryClientService],
})
export class NationalRegistryClientModule {} 