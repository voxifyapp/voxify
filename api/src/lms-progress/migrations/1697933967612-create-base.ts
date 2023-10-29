import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBase1697933967612 implements MigrationInterface {
    name = 'CreateBase1697933967612'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lesson_response" ADD "status" character varying NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "lesson_response"."status" IS 'State of the lesson for the user'`);
        await queryRunner.query(`ALTER TABLE "activity_response" ADD "lessonResponseId" uuid`);
        await queryRunner.query(`ALTER TABLE "activity_response" ADD CONSTRAINT "FK_1062f8f97b7d9bcb160304c0e76" FOREIGN KEY ("lessonResponseId") REFERENCES "lesson_response"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "activity_response" DROP CONSTRAINT "FK_1062f8f97b7d9bcb160304c0e76"`);
        await queryRunner.query(`ALTER TABLE "activity_response" DROP COLUMN "lessonResponseId"`);
        await queryRunner.query(`COMMENT ON COLUMN "lesson_response"."status" IS 'State of the lesson for the user'`);
        await queryRunner.query(`ALTER TABLE "lesson_response" DROP COLUMN "status"`);
    }

}
