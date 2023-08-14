import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUnit1691156481559 implements MigrationInterface {
  name = 'CreateUnit1691156481559';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."unit_proficiencylevel_enum" AS ENUM('Beginner', 'Medium', 'Advanced')`,
    );
    await queryRunner.query(
      `CREATE TABLE "unit" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "deletedAt" TIMESTAMP, "proficiencyLevel" "public"."unit_proficiencylevel_enum" NOT NULL, "title" text NOT NULL, "order" integer NOT NULL, "courseId" uuid, CONSTRAINT "PK_4252c4be609041e559f0c80f58a" PRIMARY KEY ("id")); COMMENT ON COLUMN "unit"."proficiencyLevel" IS 'What proficiency level this course is for'; COMMENT ON COLUMN "unit"."title" IS 'The title of the course'; COMMENT ON COLUMN "unit"."order" IS 'The order of this unit in the course'`,
    );
    await queryRunner.query(
      `ALTER TABLE "unit" ADD CONSTRAINT "FK_c88f881f8a9aa8be02740289776" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "unit" DROP CONSTRAINT "FK_c88f881f8a9aa8be02740289776"`,
    );
    await queryRunner.query(`DROP TABLE "unit"`);
    await queryRunner.query(`DROP TYPE "public"."unit_proficiencylevel_enum"`);
  }
}
