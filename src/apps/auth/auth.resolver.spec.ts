import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { LoginResponse } from './models/login.model';

const mockAuthService = {
  login: jest.fn(),
};

describe('AuthResolver', () => {
  let resolver: AuthResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('login', () => {
    it('should call authService.login with the correct input and return its result', () => {
      const loginInput: LoginInput = { phoneNumber: '7728391' };
      const expectedResponse: LoginResponse = {
        success: true,
        ssn: '1203894569',
        name: 'Jökull Þórðarson',
      };

      mockAuthService.login.mockReturnValue(expectedResponse);

      const result = resolver.login(loginInput);

      expect(mockAuthService.login).toHaveBeenCalledWith(loginInput);
      expect(result).toEqual(expectedResponse);
    });

    it('should handle login failure response from authService', () => {
      const loginInput: LoginInput = { phoneNumber: '0000000' };
      const expectedResponse: LoginResponse = {
        success: false,
        error: 'Notandi með símanúmer 0000000 finnst ekki',
      };

      mockAuthService.login.mockReturnValue(expectedResponse);

      const result = resolver.login(loginInput);

      expect(mockAuthService.login).toHaveBeenCalledWith(loginInput);
      expect(result).toEqual(expectedResponse);
    });
  });
});
