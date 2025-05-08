import { Injectable } from '@nestjs/common';
import { LoginInput } from './dto/login.input';
import { LoginResponse } from './models/login.model';

@Injectable()
export class AuthService {
  /*
  This is a mock login implementation. This would be handled by the Ísland.is authentication system in reality. 
  */
  login(input: LoginInput): LoginResponse {
    const cleanPhoneNumber = input.phoneNumber.replace(/[\s-]/g, '');
    if (cleanPhoneNumber === '7728391') {
      return {
        success: true,
        ssn: '1203894569',
        name: 'Jökull Þórðarson',
      };
    }
    if (cleanPhoneNumber === '5556969') {
      return {
        success: true,
        ssn: '2811882089',
        name: 'Kristleifur Þorsteinsson',
      };
    }
    return {
      success: false,
      error: 'User with phone number ' + input.phoneNumber + ' not found',
    };
  }
}
