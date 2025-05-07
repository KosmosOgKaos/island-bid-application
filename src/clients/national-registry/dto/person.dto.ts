import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PersonDTO {
  @Field()
  name: string;

  @Field()
  kennitala: string;

  @Field()
  address: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  telephone?: string;
}
