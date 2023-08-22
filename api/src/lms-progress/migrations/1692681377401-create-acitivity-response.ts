import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAcitivityResponse1692681377401 implements MigrationInterface {
    name = 'CreateAcitivityResponse1692681377401'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "activity_response" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "deletedAt" TIMESTAMP, "responseData" jsonb NOT NULL DEFAULT '{}', "timeTaken" real NOT NULL, "result" character varying NOT NULL, "activityId" uuid, CONSTRAINT "PK_f94795c04911448cb08adbd3f8a" PRIMARY KEY ("id")); COMMENT ON COLUMN "activity_response"."responseData" IS 'The data the user submitted for the activity. We will use this to track how they interacted with each activity'; COMMENT ON COLUMN "activity_response"."timeTaken" IS 'The number of seconds the user spent on this activity'; COMMENT ON COLUMN "activity_response"."result" IS 'Did the user pass or fail this activity?'`);
        await queryRunner.query(`ALTER TABLE "activity_response" ADD CONSTRAINT "FK_62d30a1aa983eac74a7164c549f" FOREIGN KEY ("activityId") REFERENCES "activity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "activity_response" DROP CONSTRAINT "FK_62d30a1aa983eac74a7164c549f"`);
        await queryRunner.query(`DROP TABLE "activity_response"`);
    }

}
