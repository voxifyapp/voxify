import { Test, TestingModule } from '@nestjs/testing';
import { mockRepository } from 'src/common/mocks/mockedRepository';
import { courseFactory } from 'src/lms/fixtures/lms.fixtures';
import { CourseRepository } from 'src/lms/repositories/lms.repository';
import { LmsService } from './lms.service';

describe('LmsService', () => {
  let service: LmsService;
  let courseRepo: CourseRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LmsService, mockRepository(CourseRepository)],
    }).compile();

    service = module.get<LmsService>(LmsService);
    courseRepo = module.get<CourseRepository>(CourseRepository);
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
});
