import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateActivity1691157887481 implements MigrationInterface {
  name = 'CreateActivity1691157887481';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."activity_type_enum" AS ENUM('VIDEO', 'FILL_IN_THE_BLANKS', 'MULTIPLE_CHOICE', 'PRONUNCIATION', 'FORM_A_SENTENCE')`,
    );
    await queryRunner.query(
      `CREATE TABLE "activity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "deletedAt" TIMESTAMP, "type" "public"."activity_type_enum" NOT NULL, "data" jsonb NOT NULL DEFAULT '{}', "order" integer NOT NULL, "lessonId" uuid, CONSTRAINT "PK_24625a1d6b1b089c8ae206fe467" PRIMARY KEY ("id")); COMMENT ON COLUMN "activity"."type" IS 'What type of activity is this?'; COMMENT ON COLUMN "activity"."data" IS 'The data related to the activity'; COMMENT ON COLUMN "activity"."order" IS 'The order of this activity in the lesson'`,
    );
    await queryRunner.query(
      `ALTER TABLE "unit" DROP COLUMN "proficiencyLevel"`,
    );
    await queryRunner.query(`DROP TYPE "public"."unit_proficiencylevel_enum"`);
    await queryRunner.query(
      `ALTER TABLE "lesson" DROP COLUMN "proficiencyLevel"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."lesson_proficiencylevel_enum"`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "unit"."title" IS 'The title of the unit'`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "lesson"."title" IS 'The title of the lesson'`,
    );
    await queryRunner.query(
      `ALTER TABLE "activity" ADD CONSTRAINT "FK_9a6cba12fc18f7a368387fed85a" FOREIGN KEY ("lessonId") REFERENCES "lesson"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "activity" DROP CONSTRAINT "FK_9a6cba12fc18f7a368387fed85a"`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "lesson"."title" IS 'The title of the course'`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "unit"."title" IS 'The title of the course'`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."lesson_proficiencylevel_enum" AS ENUM('Beginner', 'Medium', 'Advanced')`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson" ADD "proficiencyLevel" "public"."lesson_proficiencylevel_enum" NOT NULL`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."unit_proficiencylevel_enum" AS ENUM('Beginner', 'Medium', 'Advanced')`,
    );
    await queryRunner.query(
      `ALTER TABLE "unit" ADD "proficiencyLevel" "public"."unit_proficiencylevel_enum" NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "activity"`);
    await queryRunner.query(`DROP TYPE "public"."activity_type_enum"`);
  }
}
