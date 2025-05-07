import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginResponse {
  @Field()
  success: boolean;

  @Field({ nullable: true })
  ssn?: string;

  @Field({ nullable: true })
  error?: string;
}
