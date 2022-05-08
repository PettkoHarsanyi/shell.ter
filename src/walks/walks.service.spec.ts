import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Test, TestingModule } from '@nestjs/testing';
import { Walk } from './entities/walk';
import { WalksService } from './walks.service';

describe('WalksService', () => {
  let service: WalksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WalksService,      
        {provide: getRepositoryToken(Walk), useValue: {}}
      ],
    }).compile();

    service = module.get<WalksService>(WalksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
