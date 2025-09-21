import { Module } from '@nestjs/common';
import { CompanionService } from './companion.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Companion } from './entities/companion.entity';
import { CompanionController } from './companion.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Companion])],
  controllers: [CompanionController],
  providers: [CompanionService],
})
export class CompanionModule {}
