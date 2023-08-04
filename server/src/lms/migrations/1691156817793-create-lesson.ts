import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateLesson1691156817793 implements MigrationInterface {
  name = 'CreateLesson1691156817793';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."lesson_proficiencylevel_enum" AS ENUM('Beginner', 'Medium', 'Advanced')`,
    );
    await queryRunner.query(
      `CREATE TABLE "lesson" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "deletedAt" TIMESTAMP, "proficiencyLevel" "public"."lesson_proficiencylevel_enum" NOT NULL, "title" text NOT NULL, "order" integer NOT NULL, "unitId" uuid, CONSTRAINT "PK_0ef25918f0237e68696dee455bd" PRIMARY KEY ("id")); COMMENT ON COLUMN "lesson"."proficiencyLevel" IS 'What proficiency level this course is for'; COMMENT ON COLUMN "lesson"."title" IS 'The title of the course'; COMMENT ON COLUMN "lesson"."order" IS 'The order of this lesson in the unit'`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson" ADD CONSTRAINT "FK_2e4ec2ae66c028d3b20f8ff0eb9" FOREIGN KEY ("unitId") REFERENCES "unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lesson" DROP CONSTRAINT "FK_2e4ec2ae66c028d3b20f8ff0eb9"`,
    );
    await queryRunner.query(`DROP TABLE "lesson"`);
    await queryRunner.query(
      `DROP TYPE "public"."lesson_proficiencylevel_enum"`,
    );
  }
}
