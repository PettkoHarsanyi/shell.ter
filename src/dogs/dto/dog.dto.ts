import { UserDto } from "../../users/dto/user.dto";
import { User } from "../../users/entity/user";
import { WalkDto } from "../../walks/dto/walk.dto";
import { Dog } from "../entities/dog";

export class DogDto {
    id?: number;
    name?: string;
    type?: string;
    age?: number;
    weight?: number;
    strength?: number;
    walks?: WalkDto[];
    careTakers?: UserDto[];
    createdAt?: Date;
    modifiedAt?: Date;

    constructor(dog?: Dog){
        if(dog){
            this.id = dog.id;
            this.name = dog.name;
            this.type = dog.type;
            this.age = dog.age;
            this.weight = dog.weight;
            this.strength = dog.strength;
            this.createdAt = dog.createdAt;
            this.modifiedAt = dog.modifiedAt;

            if(dog.walks?.isInitialized(true)){
                this.walks = dog.walks.getItems().map((walk)=>new WalkDto(walk));
            }

            if(dog.careTakers.isInitialized(true)){
                this.careTakers = dog.careTakers.getItems().map((careTaker)=> new UserDto(careTaker));
            }
        }
    }
}