import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginInput } from './dto/login.input';
import { LoginResponse } from './models/login.model';

@Resolver()
export class AuthResolver {
  constructor() {}

  @Mutation(() => LoginResponse)
  // This is a mock login implementation
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login(@Args('input') input: LoginInput): LoginResponse {
    return { success: true, ssn: '1203894569' };
  }
}
