import { Collection, Entity, Enum, ManyToMany, OneToMany, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Dog } from "../../dogs/entities/dog";
import { Walk } from "../../walks/entities/walk";

@Entity()
export class User{
    @PrimaryKey()
    id!: number;

    @Property()
    name!: string;

    @Property({unique: true})
    userName!: string;

    @Property()
    password!: string;

    @Property()
    age: number;

    @Property()
    isEmployee: boolean;

    @ManyToMany(() => Dog)
    dogs = new Collection<Dog>(this);

    @Property()
    strength!: number;

    @OneToMany(()=>Walk, (walk)=> walk.walker)
    walks = new Collection<Walk>(this);

    @Enum()
    role: UserRole;
}

export enum UserRole{
    Admin = 'ADMIN',
    Employee = 'EMPLOYEE',
    Volunteer = 'VOLUNTEER'
}