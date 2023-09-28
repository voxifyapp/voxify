import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBase1695823982278 implements MigrationInterface {
    name = 'CreateBase1695823982278'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "activity_response" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "deletedAt" TIMESTAMP, "responseData" jsonb NOT NULL DEFAULT '{}', "timeTaken" real NOT NULL, "result" character varying NOT NULL, "profileId" uuid NOT NULL, "activityId" uuid NOT NULL, CONSTRAINT "PK_f94795c04911448cb08adbd3f8a" PRIMARY KEY ("id")); COMMENT ON COLUMN "activity_response"."responseData" IS 'The data the user submitted for the activity. We will use this to track how they interacted with each activity'; COMMENT ON COLUMN "activity_response"."timeTaken" IS 'The number of seconds the user spent on this activity'; COMMENT ON COLUMN "activity_response"."result" IS 'Did the user pass or fail this activity?'`);
        await queryRunner.query(`CREATE TABLE "lesson_response" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "deletedAt" TIMESTAMP, "lessonId" uuid NOT NULL, "profileId" uuid NOT NULL, CONSTRAINT "PK_bb3f0bd13535086ca460759eac9" PRIMARY KEY ("id")); COMMENT ON COLUMN "lesson_response"."lessonId" IS 'The lesson that was completed, can have multiple responses for the same lesson'`);
        await queryRunner.query(`CREATE TABLE "unit_response" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "deletedAt" TIMESTAMP, "unitId" uuid NOT NULL, "profileId" uuid NOT NULL, CONSTRAINT "PK_7a27dbab749fb31c09dde32a1fb" PRIMARY KEY ("id")); COMMENT ON COLUMN "unit_response"."unitId" IS 'The unit that was completed'`);
        await queryRunner.query(`ALTER TABLE "activity_response" ADD CONSTRAINT "FK_e8f1b2a04aace99758769195c8c" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "activity_response" ADD CONSTRAINT "FK_62d30a1aa983eac74a7164c549f" FOREIGN KEY ("activityId") REFERENCES "activity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lesson_response" ADD CONSTRAINT "FK_61e10ca04080ab5ee1063ba539b" FOREIGN KEY ("lessonId") REFERENCES "lesson"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lesson_response" ADD CONSTRAINT "FK_90f1b4985f527246a27157801ae" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "unit_response" ADD CONSTRAINT "FK_d8e9367e24d8df13f5000191ec2" FOREIGN KEY ("unitId") REFERENCES "unit"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "unit_response" ADD CONSTRAINT "FK_6bfda697ccfbf362f3a69e536be" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unit_response" DROP CONSTRAINT "FK_6bfda697ccfbf362f3a69e536be"`);
        await queryRunner.query(`ALTER TABLE "unit_response" DROP CONSTRAINT "FK_d8e9367e24d8df13f5000191ec2"`);
        await queryRunner.query(`ALTER TABLE "lesson_response" DROP CONSTRAINT "FK_90f1b4985f527246a27157801ae"`);
        await queryRunner.query(`ALTER TABLE "lesson_response" DROP CONSTRAINT "FK_61e10ca04080ab5ee1063ba539b"`);
        await queryRunner.query(`ALTER TABLE "activity_response" DROP CONSTRAINT "FK_62d30a1aa983eac74a7164c549f"`);
        await queryRunner.query(`ALTER TABLE "activity_response" DROP CONSTRAINT "FK_e8f1b2a04aace99758769195c8c"`);
        await queryRunner.query(`DROP TABLE "unit_response"`);
        await queryRunner.query(`DROP TABLE "lesson_response"`);
        await queryRunner.query(`DROP TABLE "activity_response"`);
    }

}
