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
}
