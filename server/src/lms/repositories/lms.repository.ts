import { Injectable } from '@nestjs/common';
import { Activity } from 'src/lms/entities/activity.entity';
import { Course } from 'src/lms/entities/course.entity';
import { Lesson } from 'src/lms/entities/lesson.entity';
import { Unit } from 'src/lms/entities/unit.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CourseRepository extends Repository<Course> {
  constructor(private dataSource: DataSource) {
    super(Course, dataSource.createEntityManager());
  }
}

@Injectable()
export class UnitRepository extends Repository<Unit> {
  constructor(private dataSource: DataSource) {
    super(Course, dataSource.createEntityManager());
  }

  async listUnitsWithAssociatedLessonForCourse(courseId: string) {
    return await this.find({
      where: { course: { id: courseId } },
      relations: { lessons: true },
    });
  }
}

@Injectable()
export class LessonRepository extends Repository<Lesson> {
  constructor(private dataSource: DataSource) {
    super(Lesson, dataSource.createEntityManager());
  }
}

@Injectable()
export class ActivityRepository extends Repository<Activity> {
  constructor(private dataSource: DataSource) {
    super(Activity, dataSource.createEntityManager());
  }

  async listActivitiesForLesson(lessonId: string) {
    return await this.find({
      where: { lesson: { id: lessonId } },
    });
  }
}
