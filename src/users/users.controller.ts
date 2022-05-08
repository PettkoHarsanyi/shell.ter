import { UniqueConstraintViolationException } from '@mikro-orm/core';
import { Body, Controller, HttpException, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AllowAnonymous } from '../auth/allow-anonymous';
import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { UserParam } from '../auth/user-param.decorator';
import { UserAuthDto } from './dto/user-auth.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    
    constructor(private usersService: UsersService, 
        private authService: AuthService){}


    @AllowAnonymous()
    @Post('')
    async create(@Body() userAuthDto: UserAuthDto){
        try{
            const newUser = await this.usersService.create(userAuthDto);
            return new UserDto(newUser);
        }catch(e){
            if(e instanceof UniqueConstraintViolationException){
                throw new HttpException('UserName is occupied', HttpStatus.CONFLICT)
            }else
            {
                throw e;
            }
        }
    }

    @AllowAnonymous()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@UserParam() user: UserDto){
        return {
            user,
            access_token: await this.authService.generateJwt(user),
          };
    }

}
