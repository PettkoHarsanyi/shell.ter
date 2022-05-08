
import { Collection, Entity, ManyToMany, OneToMany, OneToOne, PrimaryKey, Property } from '@mikro-orm/core'
import { User } from '../../users/entity/user';
import { Walk } from '../../walks/entities/walk';

@Entity()
export class Dog{
    @PrimaryKey()
    id!: number;

    @Property()
    name!: string;
    
    @Property()
    type!: string;

    @Property()
    age!: number;

    @Property()
    weight!: number;

    @Property()
    strength!: number;

    @ManyToMany(()=>User, user => user.dogs)
    careTakers = new Collection<User>(this);

    @OneToMany(()=>Walk, (walk) => walk.dog)
    walks = new Collection<Walk>(this);

    @Property({onCreate: ()=>new Date()})
    createdAt!: Date;

    @Property({onCreate: ()=>new Date(), onUpdate: () => new Date()})
    modifiedAt!: Date;
}

