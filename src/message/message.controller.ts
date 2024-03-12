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

@Controller('message')
export class MessageController {
    constructor(private readonly messageService: MessageService) {}

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
