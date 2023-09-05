import {
  Body,
  Controller,
  Get,
  HttpCode,
  ParseUUIDPipe,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { AuthenticatedRequestWithProfile } from 'src/common/request';
import {
  CreateLessonResponseDto,
  CreateUnitResponseDto,
} from 'src/lms-progress/dtos/lms-progress.dto';
import { LmsProgressService } from 'src/lms-progress/services/lms-progress.service';

@Controller('lms-progress/lesson-responses')
export class LessonResponseController {
  constructor(private lmsProgressService: LmsProgressService) {}

  @Post()
  @HttpCode(200)
  async create(
    @Req() req: AuthenticatedRequestWithProfile,
    @Body() data: CreateLessonResponseDto,
  ) {
    const unitResponse = await this.lmsProgressService.createLessonResponse(
      req.currentProfile.id,
      data,
    );
    return unitResponse;
  }

  @Get()
  async findAll(
    @Req() req: AuthenticatedRequestWithProfile,
    @Query('forLessonId', ParseUUIDPipe) forLessonId?: string,
  ) {
    return this.lmsProgressService.getLessonResponses(req.currentProfile.id, {
      forLessonId,
    });
  }
}

@Controller('lms-progress/unit-responses')
export class UnitResponseController {
  constructor(private lmsProgressService: LmsProgressService) {}

  @Post()
  @HttpCode(200)
  async create(
    @Req() req: AuthenticatedRequestWithProfile,
    @Body() data: CreateUnitResponseDto,
  ) {
    const unitResponse = await this.lmsProgressService.createUnitResponse(
      req.currentProfile.id,
      data,
    );
    return unitResponse;
  }

  @Get()
  async findAll(
    @Req() req: AuthenticatedRequestWithProfile,
    @Query('forUnitId', ParseUUIDPipe) forUnitId?: string,
  ) {
    return this.lmsProgressService.getUnitResponses(req.currentProfile.id, {
      forUnitId,
    });
  }
}
