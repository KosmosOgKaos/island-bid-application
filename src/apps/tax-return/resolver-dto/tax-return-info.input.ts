import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TaxReturnInfoInput {
  @Field()
  ssn: string;
}
