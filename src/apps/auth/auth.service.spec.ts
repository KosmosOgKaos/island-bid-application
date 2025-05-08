import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { LoginResponse } from './models/login.model';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should return success and user details for phone number 7728391', () => {
      const loginInput: LoginInput = { phoneNumber: '7728391' };
      const expectedResponse: LoginResponse = {
        success: true,
        ssn: '1203894569',
        name: 'Jökull Þórðarson',
      };
      expect(service.login(loginInput)).toEqual(expectedResponse);
    });

    it('should return success and user details for phone number 5556969', () => {
      const loginInput: LoginInput = { phoneNumber: '5556969' };
      const expectedResponse: LoginResponse = {
        success: true,
        ssn: '2811882089',
        name: 'Kristleifur Þorsteinsson',
      };
      expect(service.login(loginInput)).toEqual(expectedResponse);
    });

    it('should return failure for an unknown phone number', () => {
      const loginInput: LoginInput = { phoneNumber: '1234567' };
      const expectedResponse: LoginResponse = {
        success: false,
        error: 'Notandi með símanúmer 1234567 finnst ekki',
      };
      expect(service.login(loginInput)).toEqual(expectedResponse);
    });
  });
});
