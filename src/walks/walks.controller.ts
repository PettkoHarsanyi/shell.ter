import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { WalksService } from './walks.service';
import { WalkDto } from './dto/walk.dto';
import { Roles } from '../auth/roles';
import { User, UserRole } from '../users/entity/user';
import { UserParam } from '../auth/user-param.decorator';
import { AllowAnonymous } from '../auth/allow-anonymous';
import { UserDto } from '../users/dto/user.dto';

@Controller('walks')
export class WalksController {
  constructor(private readonly walksService: WalksService) {}
  
  @Get()
  async findAll(@Query() walkDto: WalkDto, @UserParam() user: UserDto): Promise<WalkDto[]> {
    console.log(user);
    const walks = await this.walksService.findAll(walkDto, user);
    return walks.map(walk => new WalkDto(walk));
  }

  @Post()
  @Roles(UserRole.Volunteer)
  async create(@Body() walkDto: WalkDto, @UserParam() user: User) {
    const newWalk = await this.walksService.create(walkDto,user);
    return new WalkDto(newWalk);
  }

}
