import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LoggingService } from './logging.service';
import { CreateLoggingDto } from '../../proto/logging';
// import { UpdateLoggingDto } from './dto/update-logging.dto';

@Controller('logging')
export class LoggingController {
  constructor(private readonly loggingService: LoggingService) {}

  @Get()
  pin() {
    return this.loggingService.pin();
  }

  @Post()
  create(@Body() createLoggingDto: CreateLoggingDto) {
    return this.loggingService.create(createLoggingDto);
  }
}
