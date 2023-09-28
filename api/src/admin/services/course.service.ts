import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/lms/entities/course.entity';
import { Repository } from 'typeorm';

export class CourseService {
  constructor(
    @InjectRepository(Course) private courseRepository: Repository<Course>,
  ) {}

  async getCourses() {
    return await this.courseRepository.find();
  }

  async getCourseById(courseId: string) {
    return await this.courseRepository.findOneBy({ id: courseId });
  }

  async createCourse({
    title,
    proficiencyLevel,
  }: Pick<Course, 'title' | 'proficiencyLevel'>) {
    return await this.courseRepository.save({
      title,
      proficiencyLevel,
    });
  }

  async updateCourse(
    courseId: string,
    data: Pick<Course, 'title' | 'proficiencyLevel'>,
  ): Promise<Course> {
    return await this.courseRepository.save({
      id: courseId,
      ...data,
    });
  }
}
