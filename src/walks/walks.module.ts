import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { WalksService } from './walks.service';
import { WalksController } from './walks.controller';
import { Walk } from './entities/walk';

@Module({
  imports: [MikroOrmModule.forFeature({entities: [Walk]})],
  controllers: [WalksController],
  providers: [WalksService]
})
export class WalksModule {}
