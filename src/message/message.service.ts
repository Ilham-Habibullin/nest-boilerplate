import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Message)
        private messagesRepository: Repository<Message>,
    ) {}

    async create(createMessageDto: CreateMessageDto) {
        return this.messagesRepository.insert({
            text: createMessageDto.text,
        });
    }

    async findAll(skip: number, take: number) {
        return this.messagesRepository.find({ skip, take });
    }

    async findOne(id: number) {
        return this.messagesRepository.findOne({
            where: { id },
        });
    }

    async remove(id: number) {
        return this.messagesRepository.delete({ id });
    }
}
