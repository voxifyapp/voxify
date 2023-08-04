import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCourse1691149800990 implements MigrationInterface {
  name = 'CreateCourse1691149800990';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."course_proficiencylevel_enum" AS ENUM('Beginner', 'Medium', 'Advanced')`,
    );
    await queryRunner.query(
      `CREATE TABLE "course" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "deletedAt" TIMESTAMP, "proficiencyLevel" "public"."course_proficiencylevel_enum", "title" text NOT NULL, CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id")); COMMENT ON COLUMN "course"."proficiencyLevel" IS 'What proficiency level this course is for'; COMMENT ON COLUMN "course"."title" IS 'The title of the course'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "course"`);
    await queryRunner.query(
      `DROP TYPE "public"."course_proficiencylevel_enum"`,
    );
  }
}
