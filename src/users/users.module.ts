import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entity/user';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [MikroOrmModule.forFeature({entities: [User]}), AuthModule],
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule {}
