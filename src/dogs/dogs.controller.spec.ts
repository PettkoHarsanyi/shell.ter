import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DogsController } from './dogs.controller';
import { DogsService } from './dogs.service';

describe('DogsController', () => {
  let controller: DogsController;
  let dogsService: any;

  beforeEach(async () => {
    dogsService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [DogsController],
      providers: [{provide: DogsService, useValue: dogsService }],
    }).compile();

    controller = module.get<DogsController>(DogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it("should give empty array when no dogs have been created", ()=>{
    dogsService.findAll.mockReturnValue([]);
    expect(controller.findAll({})).resolves.toEqual([]);
  });   
  
  it("should throw an error when the requested dog is missing", ()=>{
    dogsService.findOne.mockReturnValue(undefined);
    expect(controller.findOne(1)).rejects.toThrow();
  });    
});
