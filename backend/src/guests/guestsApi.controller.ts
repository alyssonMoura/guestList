import { Controller, Get, Param } from '@nestjs/common';
import { GuestsService } from './guests.service';
import { Guest } from './entities/guest.entity';

@Controller('guests')
export class GuestsController {
  constructor(private readonly guestsService: GuestsService) {}

  @Get('phone/:phone')
  findByPhone(@Param('phone') phone: string): Promise<Guest | undefined> {
    return this.guestsService.findByPhone(phone);
  }
}
