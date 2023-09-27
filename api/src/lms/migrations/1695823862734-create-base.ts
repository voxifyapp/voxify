import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBase1695823862734 implements MigrationInterface {
    name = 'CreateBase1695823862734'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."course_proficiencylevel_enum" AS ENUM('Beginner', 'Medium', 'Advanced')`);
        await queryRunner.query(`CREATE TABLE "course" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "deletedAt" TIMESTAMP, "proficiencyLevel" "public"."course_proficiencylevel_enum" NOT NULL, "title" text NOT NULL, CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id")); COMMENT ON COLUMN "course"."proficiencyLevel" IS 'What proficiency level this course is for'; COMMENT ON COLUMN "course"."title" IS 'The title of the course'`);
        await queryRunner.query(`CREATE TABLE "unit" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "deletedAt" TIMESTAMP, "title" text NOT NULL, "order" integer NOT NULL, "courseId" uuid, CONSTRAINT "PK_4252c4be609041e559f0c80f58a" PRIMARY KEY ("id")); COMMENT ON COLUMN "unit"."title" IS 'The title of the unit'; COMMENT ON COLUMN "unit"."order" IS 'The order of this unit in the course'`);
        await queryRunner.query(`CREATE TABLE "lesson" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "deletedAt" TIMESTAMP, "title" text NOT NULL DEFAULT '', "order" integer NOT NULL, "unitId" uuid, CONSTRAINT "PK_0ef25918f0237e68696dee455bd" PRIMARY KEY ("id")); COMMENT ON COLUMN "lesson"."title" IS 'The title of the lesson'; COMMENT ON COLUMN "lesson"."order" IS 'The order of this lesson in the unit'`);
        await queryRunner.query(`CREATE TYPE "public"."activity_type_enum" AS ENUM('VIDEO', 'FILL_IN_THE_BLANKS', 'MULTIPLE_CHOICE', 'PRONUNCIATION', 'FORM_A_SENTENCE', 'TEXT')`);
        await queryRunner.query(`CREATE TABLE "activity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "deletedAt" TIMESTAMP, "type" "public"."activity_type_enum" NOT NULL, "heading" text NOT NULL DEFAULT '', "data" jsonb NOT NULL DEFAULT '{}', "order" integer NOT NULL, "lessonId" uuid, CONSTRAINT "PK_24625a1d6b1b089c8ae206fe467" PRIMARY KEY ("id")); COMMENT ON COLUMN "activity"."type" IS 'What type of activity is this?'; COMMENT ON COLUMN "activity"."heading" IS 'The heading of the activity'; COMMENT ON COLUMN "activity"."data" IS 'The data related to the activity'; COMMENT ON COLUMN "activity"."order" IS 'The order of this activity in the lesson'`);
        await queryRunner.query(`ALTER TABLE "unit" ADD CONSTRAINT "FK_c88f881f8a9aa8be02740289776" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lesson" ADD CONSTRAINT "FK_2e4ec2ae66c028d3b20f8ff0eb9" FOREIGN KEY ("unitId") REFERENCES "unit"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "activity" ADD CONSTRAINT "FK_9a6cba12fc18f7a368387fed85a" FOREIGN KEY ("lessonId") REFERENCES "lesson"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "activity" DROP CONSTRAINT "FK_9a6cba12fc18f7a368387fed85a"`);
        await queryRunner.query(`ALTER TABLE "lesson" DROP CONSTRAINT "FK_2e4ec2ae66c028d3b20f8ff0eb9"`);
        await queryRunner.query(`ALTER TABLE "unit" DROP CONSTRAINT "FK_c88f881f8a9aa8be02740289776"`);
        await queryRunner.query(`DROP TABLE "activity"`);
        await queryRunner.query(`DROP TYPE "public"."activity_type_enum"`);
        await queryRunner.query(`DROP TABLE "lesson"`);
        await queryRunner.query(`DROP TABLE "unit"`);
        await queryRunner.query(`DROP TABLE "course"`);
        await queryRunner.query(`DROP TYPE "public"."course_proficiencylevel_enum"`);
    }

}
