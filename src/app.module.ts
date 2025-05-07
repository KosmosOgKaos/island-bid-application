import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TaxReturnClientService } from '@clients/tax-return/tax-return-client.service';
import { TaxReturnClientModule } from '@clients/tax-return/tax-return-client.module';
import { NationalRegistryClientModule } from '@clients/national-registry/national-registry-client.module';
import { TaxReturnService } from './apps/tax-return/tax-return.service';
import { TaxReturnResolver } from './apps/tax-return/tax-return.resolver';
import { AuthModule } from './apps/auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      graphiql: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    TaxReturnClientModule,
    NationalRegistryClientModule,
    AuthModule,
  ],
  providers: [
    TaxReturnService,
    TaxReturnResolver,
    TaxReturnClientService,
  ],
})
export class AppModule {}
