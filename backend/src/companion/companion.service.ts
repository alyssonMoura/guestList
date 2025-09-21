import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Companion } from './entities/companion.entity';
import { CreateCompanionDto } from './dto/create-companion.dto';
import { UpdateCompanionDto } from './dto/update-companion.dto';

@Injectable()
export class CompanionService {
  constructor(
    @InjectRepository(Companion)
    private readonly companionRepository: Repository<Companion>,
  ) {}

  create(createCompanionDto: CreateCompanionDto) {
    const companion = this.companionRepository.create(createCompanionDto);
    return this.companionRepository.save(companion);
  }

  findAll() {
    return this.companionRepository.find();
  }

  findOne(id: number) {
    return this.companionRepository.findOne({ where: { id } });
  }

  async update(id: number, updateCompanionDto: UpdateCompanionDto) {
    const companion = await this.companionRepository.preload({
      id: id,
      ...updateCompanionDto,
    });
    if (!companion) {
      throw new NotFoundException(`Companion with ID "${id}" not found`);
    }
    return this.companionRepository.save(companion);
  }

  remove(id: number) {
    return this.companionRepository.delete(id);
  }

  findByGuest(idGuest: number) {
    return this.companionRepository.find({ where: { guestId: idGuest } });
  }
}
