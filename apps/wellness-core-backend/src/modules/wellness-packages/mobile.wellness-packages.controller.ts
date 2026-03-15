import {
  Controller,
  Get,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { WellnessPackagesService } from './wellness-packages.service';

@Controller('mobile/packages')
export class MobileWellnessPackagesController {
  constructor(
    private readonly wellnessPackagesService: WellnessPackagesService,
  ) {}

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.wellnessPackagesService.findAllPaginated(page, limit);
  }
}
