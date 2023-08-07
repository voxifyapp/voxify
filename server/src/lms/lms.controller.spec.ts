import { Test, TestingModule } from '@nestjs/testing';
import { mockService } from 'src/common/mocks/mockService';
import {
  activityFactory,
  courseFactory,
  lessonFactory,
  unitFactory,
} from 'src/lms/fixtures/lms.fixtures';
import { LmsService } from 'src/lms/services/lms.service';
import { LmsController } from './lms.controller';

describe('LmsController', () => {
  let controller: LmsController;
  let service: LmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LmsController],
      providers: [mockService(LmsService)],
    }).compile();

    controller = module.get<LmsController>(LmsController);
    service = module.get<LmsService>(LmsService);
  });

  describe('getCourses', () => {
    it('should return an array of courses', async () => {
      const result = courseFactory.buildList(2);
      service.getCourses = jest.fn().mockResolvedValue(result);

      expect(await controller.getCourses()).toBe(result);
    });
  });

  describe('getCourseById', () => {
    it('should return a course by ID', async () => {
      const courseId = 'xyz';
      const result = courseFactory.build({ id: courseId });

      service.getCourseById = jest.fn().mockResolvedValue(result);

      expect(await controller.getCourseById(courseId)).toBe(result);
    });
  });

  describe('getUnitsWithAssociatedLessonsForCourse', () => {
    it('should return an array of units with associated lessons for a course', async () => {
      const courseId = 'xyz';
      const result = unitFactory.buildList(2, {
        course: courseFactory.build({ id: courseId }),
      });

      service.getUnitsWithAssociatedLessonsForCourse = jest
        .fn()
        .mockResolvedValue(result);

      expect(
        await controller.getUnitsWithAssociatedLessonsForCourse(courseId),
      ).toBe(result);
    });
  });

  describe('getLessonById', () => {
    it('should return a lesson by ID', async () => {
      const result = lessonFactory.build({ id: '1' });
      service.getLessonById = jest.fn().mockResolvedValue({ ...result });

      expect((await controller.getLessonById('1')).id).toBe('1');
      expect(service.getLessonById).toBeCalledWith('1');
    });
  });

  describe('getActivitiesForLesson', () => {
    it('should return an array of activities for a lesson', async () => {
      const activityList = activityFactory.buildList(
        2,
        {},
        { associations: { lesson: lessonFactory.build({ id: '1' }) } },
      );

      service.getActivitiesForLesson = jest
        .fn()
        .mockResolvedValue([...activityList]);

      const result = await controller.getActivitiesForLesson('1');

      expect(result).toStrictEqual(activityList);
      expect(service.getActivitiesForLesson).toBeCalledWith('1');
    });
  });
});
