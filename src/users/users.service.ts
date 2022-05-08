import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/sqlite';
import { Injectable } from '@nestjs/common';
import { UserAuthDto } from './dto/user-auth.dto';
import { User, UserRole } from './entity/user';
import { pbkdf2 } from 'crypto';
import { promisify } from 'util';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
    
    constructor(
        @InjectRepository(User)
        private userRepository: EntityRepository<User>,
        private authService: AuthService
    ){}

    async create(userAuthDto: UserAuthDto): Promise<User> {
        const user = new User();

        user.name = userAuthDto.name;
        user.userName = userAuthDto.userName;
        user.role = UserRole.Volunteer;
        user.age = 0;
        user.isEmployee = false;
        user.strength = 0;
        user.password = await this.authService.hashPassword(userAuthDto.password);

        await this.userRepository.persistAndFlush(user);

        return user;
    }

    
}
