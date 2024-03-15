import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
    transport: Transport.GRPC,
    options: {
        package: 'message', // ['packet', 'packet2']
        protoPath: join(__dirname, './message/message.proto'),
        // ['./packets/packet.proto', './packets/packet2.proto']
    },
};
