import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { WellnessPackagesService } from './wellness-packages.service';
import {
  CreateWellnessPackageDto,
  UpdateWellnessPackageDto,
} from '@wellness/shared-typescript';

@Controller('admin/packages')
export class AdminWellnessPackagesController {
  constructor(
    private readonly wellnessPackagesService: WellnessPackagesService,
  ) {}

  @Get()
  findAll() {
    return this.wellnessPackagesService.findAll();
  }

  @Post()
  create(@Body() body: unknown) {
    const parsed = CreateWellnessPackageDto.safeParse(body);
    if (!parsed.success) {
      throw new BadRequestException(parsed.error.flatten());
    }
    return this.wellnessPackagesService.create(parsed.data);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: unknown) {
    const parsed = UpdateWellnessPackageDto.safeParse(body);
    if (!parsed.success) {
      throw new BadRequestException(parsed.error.flatten());
    }
    return this.wellnessPackagesService.update(id, parsed.data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.wellnessPackagesService.remove(id);
  }
}
