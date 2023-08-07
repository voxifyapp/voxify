import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCourseEnrollment1691413727942 implements MigrationInterface {
  name = 'CreateCourseEnrollment1691413727942';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "course_enrollment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "deletedAt" TIMESTAMP, "profileId" character varying NOT NULL, "courseId" character varying NOT NULL, CONSTRAINT "PK_3ae773370689173c290163de513" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "course_enrollment"`);
  }
}
