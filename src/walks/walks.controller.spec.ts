import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Test, TestingModule } from '@nestjs/testing';
import { Walk } from './entities/walk';
import { WalksController } from './walks.controller';
import { WalksService } from './walks.service';

describe('WalksController', () => {
  let controller: WalksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalksController],
      providers: [
        {provide: WalksService,useValue: {}}
      ],
    }).compile();

    controller = module.get<WalksController>(WalksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
