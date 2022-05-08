import { Module } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { DogsController } from './dogs.controller';
import { MikroOrmMiddleware, MikroOrmModule } from '@mikro-orm/nestjs';
import { Dog } from './entities/dog';
import { Walk } from '../walks/entities/walk';

@Module({
  imports: [MikroOrmModule.forFeature({entities: [Dog,Walk]})],
  providers: [DogsService],
  controllers: [DogsController]
})
export class DogsModule {}