import { Profile } from 'src/auth/entities/profile.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Course } from 'src/lms/entities/course.entity';
import { Column, Entity, OneToOne } from 'typeorm';

@Entity()
export class CourseEnrollment extends BaseEntity {
  @OneToOne(() => Profile, (profile) => profile.id, { nullable: false })
  profile: Profile;

  @Column({
    nullable: false,
  })
  profileId: string;

  @OneToOne(() => Course, (course) => course.id, { nullable: false })
  course: Course;

  @Column({
    nullable: false,
  })
  courseId: string;
}
