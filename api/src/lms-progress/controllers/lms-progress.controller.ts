import {
  Body,
  Controller,
  Get,
  HttpCode,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { DoesNotRequireProfile, Public } from 'src/common/decorators/auth';
import { AuthenticatedRequestWithProfile } from 'src/common/request';
import {
  CreateLessonResponseDto,
  CreateUnitResponseDto,
  UpdateLessonResponseDto,
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

  @Put()
  @HttpCode(200)
  async update(
    @Req() req: AuthenticatedRequestWithProfile,
    @Body() data: UpdateLessonResponseDto,
  ) {
    console.log('In here');
    const unitResponse = await this.lmsProgressService.updateLessonResponse(
      req.currentProfile.id,
      data,
    );
    console.log(unitResponse);
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

  @Get('/test')
  @Public()
  @DoesNotRequireProfile()
  async test() {
    return this.lmsProgressService.getLessonsAndUnitsForProfile();
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
