import { Test, TestingModule } from '@nestjs/testing';
import { mockRepository } from 'src/common/mocks/mockedRepository';
import { courseFactory, unitFactory } from 'src/lms/fixtures/lms.fixtures';
import {
  CourseRepository,
  UnitRepository,
} from 'src/lms/repositories/lms.repository';
import { LmsService } from './lms.service';

describe('LmsService', () => {
  let service: LmsService;
  let courseRepo: CourseRepository;
  let unitRepo: UnitRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LmsService,
        mockRepository(CourseRepository),
        mockRepository(UnitRepository),
      ],
    }).compile();

    service = module.get<LmsService>(LmsService);
    courseRepo = module.get<CourseRepository>(CourseRepository);
    unitRepo = module.get<UnitRepository>(UnitRepository);
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

      unitRepo.listUnitsForCourse = jest.fn().mockResolvedValueOnce([...units]);

      const result = await service.getUnitsForCourse(courseId);

      expect(unitRepo.listUnitsForCourse).toHaveBeenCalledWith(courseId);
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
});
