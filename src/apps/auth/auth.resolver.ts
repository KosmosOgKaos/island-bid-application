import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginInput } from './dto/login.input';
import { LoginResponse } from './models/login.model';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  login(@Args('input') input: LoginInput): LoginResponse {
    return this.authService.login(input);
  }
}
