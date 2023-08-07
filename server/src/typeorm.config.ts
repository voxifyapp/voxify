import { configureEnv } from 'common/configure-env';
import { Profile } from 'src/auth/entities/profile.entity';
import { CourseEnrollment } from 'src/lms-progress/entities/course-enrollment.entity';
import { Activity } from 'src/lms/entities/activity.entity';
import { Course } from 'src/lms/entities/course.entity';
import { Lesson } from 'src/lms/entities/lesson.entity';
import { Unit } from 'src/lms/entities/unit.entity';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

// We do this to load the .env file, the same one that will be used by the app
configureEnv();

/**
 * We have this file because we want a unified way for how the Typeorm CLI and Nest will connect to the database
 * The CLI uses additional parameters that are not needed by Nest, like migrations
 */
export const datasourceConfig: PostgresConnectionOptions = {
  type: 'postgres',
  url: process.env.POSTGRES_URL,
  entities: [Profile, Course, Unit, Lesson, Activity, CourseEnrollment],
};

/** This datasource is only used by the TypeORM CLI */
export default new DataSource({
  ...datasourceConfig,
  migrations: ['src/**/migrations/*.ts'],
});
