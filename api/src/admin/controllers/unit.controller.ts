import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/admin/admin.guard';
import { UnitService } from 'src/admin/services/unit.service';
import { DoesNotRequireProfile } from 'src/common/decorators/auth';
import { Unit } from 'src/lms/entities/unit.entity';

@Controller('admin/units/')
@DoesNotRequireProfile()
@UseGuards(AdminGuard)
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Get()
  async findAll(@Query('courseId') courseId?: string) {
    return await this.unitService.getUnits({ courseId });
  }

  @Post()
  async create(@Body() unit: Pick<Unit, 'title' | 'order' | 'courseId'>) {
    return await this.unitService.createUnit(unit);
  }
}
