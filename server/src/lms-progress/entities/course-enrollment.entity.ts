import { Profile } from 'src/auth/entities/profile.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Course } from 'src/lms/entities/course.entity';
import { Entity, OneToOne } from 'typeorm';

@Entity()
export class CourseEnrollment extends BaseEntity {
  @OneToOne(() => Profile, (profile) => profile.id)
  profile: Profile;

  @OneToOne(() => Course, (course) => course.id)
  course: Course;
}
