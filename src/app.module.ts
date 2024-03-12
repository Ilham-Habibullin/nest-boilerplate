import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';

import { MessageModule } from './message/message.module';
import { Message } from './message/entities/message.entity';

@Module({
    imports: [
        ConfigModule.forRoot(),
        ScheduleModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: 5432,
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            entities: [Message],
            synchronize: true,
        }),
        MessageModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
