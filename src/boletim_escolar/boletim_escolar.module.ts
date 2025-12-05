import { Module } from '@nestjs/common';
import { BoletimEscolarService } from './boletim_escolar.service';
import { BoletimEscolarController } from './boletim_escolar.controller';

@Module({
  providers: [BoletimEscolarService],
  controllers: [BoletimEscolarController]
})
export class BoletimEscolarModule {}
