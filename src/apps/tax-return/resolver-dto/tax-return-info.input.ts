import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TaxReturnInfoInput {
  @Field()
  // TODO: validate kennitala
  ssn: string;
}
