import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Guest } from './entities/guest.entity';

@Injectable()
export class GuestsService {
  constructor(
    @InjectRepository(Guest)
    private guestsRepository: Repository<Guest>,
  ) {}

  // Encontra todos os convidados de um evento específico
  findAll(eventId: number): Promise<Guest[]> {
    return this.guestsRepository.find({ where: { eventId } });
  }

  // Encontra um convidado específico em um evento com sua lista de acompanhantes
  findOne(eventId: number, id: number): Promise<Guest> {
    return this.guestsRepository.findOne({
      where: { eventId, id },
      relations: ['accompaniments'],
    });
  }

  // Cria um novo convidado em um evento
  create(eventId: number, guest: Partial<Guest>): Promise<Guest> {
    const newGuest = this.guestsRepository.create({ ...guest, eventId });
    return this.guestsRepository.save(newGuest);
  }

  // Atualiza um convidado
  async update(
    eventId: number,
    id: number,
    guest: Partial<Guest>,
  ): Promise<Guest> {
    // Para atualizar uma entidade com relações em cascata (como 'accompaniments'),
    // não podemos usar `update()`, que só funciona em colunas da própria tabela.
    // O método correto é carregar a entidade, mesclar as alterações e usar `save()`.

    // 1. Carrega o convidado e suas relações para garantir que ele existe no evento correto.
    const existingGuest = await this.findOne(eventId, id);
    if (!existingGuest) {
      throw new NotFoundException(
        `Convidado com ID "${id}" não encontrado no evento "${eventId}".`,
      );
    }

    // 2. Mescla os dados do DTO (`guest`) na entidade carregada (`existingGuest`).
    // O `save` é inteligente: ele atualizará o Guest, e para `accompaniments`, ele irá
    // inserir novos, atualizar existentes e (com orphanRemoval) remover os que foram excluídos.
    const guestToSave = this.guestsRepository.merge(existingGuest, guest);

    // 3. Salva a entidade completa.
    return this.guestsRepository.save(guestToSave);
  }

  // Remove um convidado
  async remove(eventId: number, id: number): Promise<void> {
    await this.guestsRepository.delete({ eventId, id });
  }
  // Encontra um convidado por telefone em um evento específico
  async findByEventIdAndPhone(
    eventId: number,
    phone: string,
  ): Promise<Guest | undefined> {
    return this.guestsRepository.findOne({ where: { eventId, phone } });
  }
  async findByPhone(phone: string): Promise<Guest | undefined> {
    return this.guestsRepository.findOne({ where: { phone } });
  }
}
