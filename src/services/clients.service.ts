import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientsDto } from 'src/dto';
import { ClientsEntity } from 'src/model/clients.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientsEntity)
    private readonly clientsEntityRepository: Repository<ClientsEntity>,
  ) {}
  async create(dto: ClientsDto) {
    const e = await this.clientsEntityRepository.save(dto.toEntity());
    return ClientsDto.fromEntity(e);
  }

  async findAll(search: string | undefined) {
    if (search) {
      return await this.clientsEntityRepository
        .find({
          where: [{ last_name: search }],
        })
        .then((items) => items.map((e) => ClientsDto.fromEntity(e)));
    }
    return await this.clientsEntityRepository
      .find()
      .then((items) => items.map((e) => ClientsDto.fromEntity(e)));
  }

  async findOne(id: number) {
    const item = await this.clientsEntityRepository.findOne({ where: { id } });
    return item ? ClientsDto.fromEntity(item) : null;
  }

  async update(id: number, dto: ClientsDto) {
    const client = await this.clientsEntityRepository.findOne({
      where: { id },
    });
    if (!client) {
      return null;
    }
    Object.assign(client, dto.toEntity());
    await this.clientsEntityRepository.save(client);
    return ClientsDto.fromEntity(client);
  }

  async remove(id: number) {
    return await this.clientsEntityRepository.delete(id);
  }
}
