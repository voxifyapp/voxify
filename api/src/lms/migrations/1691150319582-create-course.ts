import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCourse1691150319582 implements MigrationInterface {
  name = 'CreateCourse1691150319582';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."course_proficiencylevel_enum" AS ENUM('Beginner', 'Medium', 'Advanced')`,
    );
    await queryRunner.query(
      `CREATE TABLE "course" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "deletedAt" TIMESTAMP, "proficiencyLevel" "public"."course_proficiencylevel_enum" NOT NULL, "title" text NOT NULL, CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id")); COMMENT ON COLUMN "course"."proficiencyLevel" IS 'What proficiency level this course is for'; COMMENT ON COLUMN "course"."title" IS 'The title of the course'`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "profile"."proficiencyLevel" IS 'Proficiency level of the user'`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "profile"."subscriptionEndDate" IS 'Controls access to the platform, for now we need to just set it to some date based on free trial'`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "profile"."userId" IS 'User ID associated with the profile'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`COMMENT ON COLUMN "profile"."userId" IS NULL`);
    await queryRunner.query(
      `COMMENT ON COLUMN "profile"."subscriptionEndDate" IS NULL`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "profile"."proficiencyLevel" IS NULL`,
    );
    await queryRunner.query(`DROP TABLE "course"`);
    await queryRunner.query(
      `DROP TYPE "public"."course_proficiencylevel_enum"`,
    );
  }
}
