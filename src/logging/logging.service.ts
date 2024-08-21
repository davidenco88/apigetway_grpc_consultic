import { Inject, Injectable, OnModuleInit } from '@nestjs/common';

import {
  CreateLoggingDto,
  LoggingServiceClient,
  LOGGING_SERVICE_NAME,
  LOGGING_PACKAGE_NAME,
} from '../../proto/logging';

import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class LoggingService implements OnModuleInit {
  private loggingService: LoggingServiceClient;

  constructor(@Inject(LOGGING_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.loggingService =
      this.client.getService<LoggingServiceClient>(LOGGING_SERVICE_NAME);
  }

  pin() {
    return this.loggingService.pin({});
  }

  create(createLoggingDto: CreateLoggingDto) {
    return this.loggingService.createLogging(createLoggingDto);
  }
}
