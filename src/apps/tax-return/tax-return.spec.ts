import { Test, TestingModule } from '@nestjs/testing';
import { TaxReturnController } from './tax-return.controller';
import { TaxReturnService } from './tax-return.service';

describe('TaxReturnController', () => {
  let taxReturnController: TaxReturnController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TaxReturnController],
      providers: [TaxReturnService],
    }).compile();

    taxReturnController = app.get<TaxReturnController>(TaxReturnController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(taxReturnController.getHello()).toBe('Hello World!');
    });
  });
});
