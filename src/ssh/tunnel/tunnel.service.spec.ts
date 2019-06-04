import { Test, TestingModule } from '@nestjs/testing';
import { TunnelService } from './tunnel.service';
import { DomainMapperService } from '../domain-mapper/domain-mapper.service';

describe('TunnelService', () => {
  let service: TunnelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TunnelService, DomainMapperService],
    }).compile();

    service = module.get<TunnelService>(TunnelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
