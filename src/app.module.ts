import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SshModule } from './ssh/ssh.module';

@Module({
  imports: [SshModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
