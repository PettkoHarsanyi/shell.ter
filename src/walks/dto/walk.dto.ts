import { Dog } from "../../dogs/entities/dog";
import { UserDto } from "../../users/dto/user.dto";
import { User } from "../../users/entity/user";
import { Walk } from "../entities/walk";

export class WalkDto {
    id?: number;
    duration?: number;
    dog?: Dog;
    createdAt?: Date;
    modifiedAt?: Date;
    walker: UserDto;

    constructor(walk?: Walk){
        if(walk){
            this.id = walk.id;
            this.dog = walk.dog;
            this.duration = walk.duration;
            this.createdAt = walk.createdAt;
            this.modifiedAt = walk.modifiedAt;
            this.walker = walk.walker;

            if(walk.walker && walk.walker instanceof User){
                this.walker = {
                    id: walk.walker.id,
                    name: walk.walker.name,
                    role: walk.walker.role,
                }
            }

        }
    }
}