import { Entity, ManyToMany, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Dog } from "../../dogs/entities/dog";
import { User } from "../../users/entity/user";

@Entity()
export class Walk {

    @PrimaryKey()
    id!: number;

    @Property()
    duration!: number;
    
    @ManyToOne(()=>Dog)
    dog: Dog;

    @ManyToOne(()=>User)
    walker: User;

    @Property({onCreate: ()=>new Date()})
    createdAt!: Date;

    @Property({onCreate: ()=>new Date(), onUpdate: () => new Date()})
    modifiedAt!: Date;
}
