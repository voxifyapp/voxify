import { Test, TestingModule } from '@nestjs/testing';
import { ProficiencyLevel } from 'src/auth/entities/profile.entity';
import { profileFactory } from 'src/auth/fixtures/profile.fixture';
import { mockRepository } from 'src/common/mocks/mockedRepository';
import {
  activityFactory,
  courseFactory,
  lessonFactory,
  unitFactory,
} from 'src/lms/fixtures/lms.fixtures';
import {
  ActivityRepository,
  CourseRepository,
  LessonRepository,
  UnitRepository,
} from 'src/lms/repositories/lms.repository';
import { LmsService } from './lms.service';

describe('LmsService', () => {
  let service: LmsService;
  let courseRepo: CourseRepository;
  let unitRepo: UnitRepository;
  let lessonRepo: LessonRepository;
  let activityRepo: ActivityRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LmsService,
        mockRepository(CourseRepository),
        mockRepository(UnitRepository),
        mockRepository(LessonRepository),
        mockRepository(ActivityRepository),
      ],
    }).compile();

    service = module.get<LmsService>(LmsService);
    courseRepo = module.get<CourseRepository>(CourseRepository);
    unitRepo = module.get<UnitRepository>(UnitRepository);
    lessonRepo = module.get<LessonRepository>(LessonRepository);
    activityRepo = module.get<ActivityRepository>(ActivityRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getCourses', () => {
    it('should return all courses', async () => {
      const courses = courseFactory.buildList(2);

      courseRepo.find = jest.fn().mockResolvedValueOnce([...courses]);
      const result = await service.getCourses();

      expect(courseRepo.find).toHaveBeenCalled();
      expect(result).toEqual(courses);
    });
  });

  describe('getCourseById', () => {
    it('should return a course with the given ID', async () => {
      const courseId = '123';
      const course = courseFactory.build({ id: courseId });

      courseRepo.findOneBy = jest.fn().mockResolvedValueOnce(course);

      const result = await service.getCourseById(courseId);

      expect(courseRepo.findOneBy).toHaveBeenCalledWith({ id: courseId });
      expect(result).toEqual(course);
    });
  });

  describe('getUnitsForCourse', () => {
    it('should return all units for a course', async () => {
      const courseId = '123';
      const units = unitFactory.buildList(2, { course: { id: courseId } });

      unitRepo.listUnitsWithAssociatedLessonForCourse = jest
        .fn()
        .mockResolvedValueOnce([...units]);

      const result = await service.getUnitsWithAssociatedLessonsForCourse(
        courseId,
      );

      expect(
        unitRepo.listUnitsWithAssociatedLessonForCourse,
      ).toHaveBeenCalledWith(courseId);
      expect(result).toEqual(units);
    });
  });

  describe('getUnitById', () => {
    it('should return a unit with the given ID', async () => {
      const unitId = '123';
      const unit = unitFactory.build({ id: unitId });

      unitRepo.findOneBy = jest.fn().mockResolvedValueOnce({ ...unit });

      const result = await service.getUnitById(unitId);

      expect(unitRepo.findOneBy).toHaveBeenCalledWith({ id: unitId });
      expect(result).toEqual(unit);
    });
  });

  describe('getLessonById', () => {
    it('should return a lesson with the given ID', async () => {
      const lessonId = '123';
      const lesson = lessonFactory.build({ id: lessonId });

      lessonRepo.findOneBy = jest.fn().mockResolvedValueOnce({ ...lesson });

      const result = await service.getLessonById(lessonId);

      expect(lessonRepo.findOneBy).toHaveBeenCalledWith({ id: lessonId });
      expect(result).toEqual(lesson);
    });
  });

  describe('getActivitiesForLesson', () => {
    it('should return all activities for a lesson', async () => {
      const lessonId = '123';
      const activities = activityFactory.buildList(
        2,
        {},
        {
          associations: {
            lesson: lessonFactory.build({ id: lessonId }),
          },
        },
      );

      activityRepo.listActivitiesForLesson = jest
        .fn()
        .mockResolvedValueOnce([...activities]);

      const result = await service.getActivitiesForLesson(lessonId);

      expect(activityRepo.listActivitiesForLesson).toHaveBeenCalledWith(
        lessonId,
      );
      expect(result).toEqual(activities);
    });
  });

  describe('getActivityById', () => {
    it('should return a activity with the given ID', async () => {
      const activityId = '123';
      const activity = activityFactory.build({ id: activityId });

      activityRepo.findOneBy = jest.fn().mockResolvedValueOnce({ ...activity });

      const result = await service.getActivityById(activityId);

      expect(activityRepo.findOneBy).toHaveBeenCalledWith({ id: activityId });
      expect(result).toEqual(activity);
    });
  });

  describe('getCourseForProfile', () => {
    it('should return a course for a profile', async () => {
      const profile = profileFactory.build({
        proficiencyLevel: ProficiencyLevel.ADVANCED,
      });
      const course = courseFactory.build({
        proficiencyLevel: profile.proficiencyLevel,
      });

      courseRepo.findOneByOrFail = jest
        .fn()
        .mockResolvedValueOnce({ ...course });

      const result = await service.getCourseForProfile(profile);

      expect(courseRepo.findOneByOrFail).toHaveBeenCalledWith({
        proficiencyLevel: profile.proficiencyLevel,
      });
      expect(result).toEqual(course);
    });
  });
});
