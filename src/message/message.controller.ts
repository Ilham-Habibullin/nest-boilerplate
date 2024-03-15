import { GrpcMethod } from '@nestjs/microservices';
import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Query,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';
import { MessageById } from './interfaces/message-by-id.interface';
import { Pagination } from './interfaces/pagination.interface';

@Controller('message')
export class MessageController {
    constructor(private readonly messageService: MessageService) {}

    // gRPC

    @GrpcMethod('MessageService', 'FindOne')
    async findOne_grpc(data: MessageById) {
        const message = await this.messageService.findOne(data.id);

        return { message };
    }

    @GrpcMethod('MessageService', 'FindMany')
    async findMany_grpc(data: Pagination): Promise<{ messages: Message[] }> {
        const messages = await this.messageService.findAll(
            data.offset,
            data.limit,
        );

        return { messages };
    }

    @GrpcMethod('MessageService', 'Create')
    async create_grpc(data: CreateMessageDto): Promise<{ ok: boolean }> {
        await this.messageService.create(data);

        return { ok: true };
    }

    @GrpcMethod('MessageService', 'Delete')
    async delete_grpc(data: MessageById): Promise<{ ok: boolean }> {
        await this.messageService.remove(data.id);

        return { ok: true };
    }

    // http

    @Post()
    create(@Body() createMessageDto: CreateMessageDto) {
        return this.messageService.create(createMessageDto);
    }

    @Get()
    findAll(@Query('offset') skip: string, @Query('limit') take: string) {
        return this.messageService.findAll(Number(skip), Number(take));
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.messageService.findOne(Number(id));
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.messageService.remove(Number(id));
    }
}
