import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { DomainMapperService } from './ssh/domain-mapper/domain-mapper.service';

@Controller()
export class AppController {

  @Inject()
  private readonly domainMapper: DomainMapperService;

  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): any {
    return this.domainMapper.get();
  }
}
