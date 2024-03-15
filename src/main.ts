import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { grpcClientOptions } from './grpc-client.options';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const microservice =
        await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
            transport: Transport.TCP,
        });

    await microservice.listen();

    app.connectMicroservice<MicroserviceOptions>(grpcClientOptions);

    await app.startAllMicroservices();
    await app.listen(3001);
}
bootstrap();
