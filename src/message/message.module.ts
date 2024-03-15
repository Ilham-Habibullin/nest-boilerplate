import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClientOptions } from '../grpc-client.options';

import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { Message } from './entities/message.entity';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'MESSAGE_PACKAGE',
                ...grpcClientOptions,
            },
        ]),
        TypeOrmModule.forFeature([Message]),
    ],
    controllers: [MessageController],
    providers: [MessageService],
})
export class MessageModule {}
