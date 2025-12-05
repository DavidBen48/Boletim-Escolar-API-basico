import { Test, TestingModule } from '@nestjs/testing';
import { BoletimEscolarController } from './boletim_escolar.controller';

describe('BoletimEscolarController', () => {
  let controller: BoletimEscolarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoletimEscolarController],
    }).compile();

    controller = module.get<BoletimEscolarController>(BoletimEscolarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
