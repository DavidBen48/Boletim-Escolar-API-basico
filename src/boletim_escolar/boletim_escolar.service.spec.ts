import { Test, TestingModule } from '@nestjs/testing';
import { BoletimEscolarService } from './boletim_escolar.service';

describe('BoletimEscolarService', () => {
  let service: BoletimEscolarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoletimEscolarService],
    }).compile();

    service = module.get<BoletimEscolarService>(BoletimEscolarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
