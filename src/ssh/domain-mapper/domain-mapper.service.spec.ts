import { Test, TestingModule } from '@nestjs/testing';
import { DomainMapperService } from './domain-mapper.service';

describe('DomainMapperService', () => {
  let service: DomainMapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DomainMapperService],
    }).compile();

    service = module.get<DomainMapperService>(DomainMapperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
