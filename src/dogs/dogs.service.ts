import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/sqlite';
import { Injectable } from '@nestjs/common';
import { WalkDto } from '../walks/dto/walk.dto';
import { Walk } from '../walks/entities/walk';
import { DogDto } from './dto/dog.dto';
import { Dog } from './entities/dog';

@Injectable()
export class DogsService {
    private _dogs: Dog[] = [];
    private _nextId = 1;

    constructor(
        @InjectRepository(Dog)
        private dogRepository: EntityRepository<Dog>,
        @InjectRepository(Walk)
        private walkRepository: EntityRepository<Walk>        
    ){}
    
    async findAll(dogDto?: DogDto): Promise<Dog[]> {
        return await this.dogRepository.find({
            name: { $like: `%${dogDto.name || ""}%`}
        });
    }

    async findOne(id : number): Promise<Dog>{
        return await this.dogRepository.findOne(
            {id},
            {populate: ['walks','careTakers']}
            );
    }

    async create(dogDto: DogDto): Promise<Dog>{
        const dog = new Dog();
        dog.name = dogDto.name;
        dog.type = dogDto.type;
        dog.age = dogDto.age;
        dog.weight = dogDto.weight;
        dog.strength = dogDto.strength;

        await this.dogRepository.persistAndFlush(dog);
        await this.dogRepository.populate(dog,['walks','careTakers']);

        return dog;
    }  

    async addWalk(id: number, walkDto: WalkDto){
        const dog = await this.findOne(id);
        if(!dog){
            return;
        }
        const walk = new Walk();
        walk.duration = walkDto.duration;
        walk.dog = dog;

        dog.walks.add(walk);

        await this.dogRepository.flush();

        return walk;
    } 

    async getWalks(id: number): Promise<Walk[]>{
        return await this.walkRepository.find({
            dog: id
        })
    }
}
