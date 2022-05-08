import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Test, TestingModule } from '@nestjs/testing';
import { Walk } from '../walks/entities/walk';
import { DogsService } from './dogs.service';
import { Dog } from './entities/dog';

describe('DogsService', () => {
  let service: DogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DogsService, 
        {provide: getRepositoryToken(Dog), useValue: {}}
        {provide: getRepositoryToken(Walk), useValue: {}}
      ],
    }).compile();

    service = module.get<DogsService>(DogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
