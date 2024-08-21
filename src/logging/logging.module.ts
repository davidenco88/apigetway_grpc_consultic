import { Module } from '@nestjs/common';
import { LoggingService } from './logging.service';
import { LoggingController } from './logging.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'logging',
        transport: Transport.GRPC,
        options: {
          package: 'logging',
          protoPath: join(__dirname, '../../logging.proto'),
        },
      },
    ]),
  ],
  controllers: [LoggingController],
  providers: [LoggingService],
})
export class LoggingModule {}
