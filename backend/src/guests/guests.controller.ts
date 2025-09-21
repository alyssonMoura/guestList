import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { GuestsService } from './guests.service';
import { Guest } from './entities/guest.entity';

@Controller('events/:eventId/guests')
export class GuestsController {
  constructor(private readonly guestsService: GuestsService) {}

  @Get()
  findAll(@Param('eventId') eventId: string): Promise<Guest[]> {
    return this.guestsService.findAll(+eventId);
  }

  @Get(':id')
  findOne(
    @Param('eventId') eventId: string,
    @Param('id') id: string,
  ): Promise<Guest> {
    return this.guestsService.findOne(+eventId, +id);
  }

  @Get('phone/:phone')
  findByPhone(
    @Param('eventId') eventId: string,
    @Param('phone') phone: string,
  ): Promise<Guest | undefined> {
    return this.guestsService.findByEventIdAndPhone(+eventId, phone);
  }

  @Post()
  create(
    @Param('eventId') eventId: string,
    @Body() guest: Partial<Guest>,
  ): Promise<Guest> {
    return this.guestsService.create(+eventId, guest);
  }

  @Put(':id')
  update(
    @Param('eventId') eventId: string,
    @Param('id') id: string,
    @Body() guest: Partial<Guest>,
  ): Promise<Guest> {
    return this.guestsService.update(+eventId, +id, guest);
  }

  @Delete(':id')
  remove(
    @Param('eventId') eventId: string,
    @Param('id') id: string,
  ): Promise<void> {
    return this.guestsService.remove(+eventId, +id);
  }
}
