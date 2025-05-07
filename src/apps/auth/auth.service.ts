import { Injectable } from '@nestjs/common';
import { LoginInput } from './dto/login.input';
import { LoginResponse } from './models/login.model';

@Injectable()
export class AuthService {
  login(input: LoginInput): LoginResponse {
    const cleanPhoneNumber = input.phoneNumber.replace(/[\s-]/g, '');
    if (cleanPhoneNumber === '7728391') {
      return {
        success: true,
        ssn: '1203894569',
      };
    }
    return {
      success: false,
      error: 'User with phone number ' + input.phoneNumber + ' not found',
    };
  }
}
