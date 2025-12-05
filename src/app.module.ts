import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoletimEscolarModule } from './boletim_escolar/boletim_escolar.module';

@Module({
  imports: [BoletimEscolarModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
