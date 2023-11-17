import { MigrationInterface, QueryRunner } from "typeorm";

export class AssociateLessonResponse1700239207316 implements MigrationInterface {
    name = 'AssociateLessonResponse1700239207316'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lesson_response" ADD "status" character varying NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "lesson_response"."status" IS 'State of the lesson for the user'`);
        await queryRunner.query(`ALTER TABLE "activity_response" ADD "lessonResponseId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "activity_response" ADD CONSTRAINT "FK_1062f8f97b7d9bcb160304c0e76" FOREIGN KEY ("lessonResponseId") REFERENCES "lesson_response"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "activity_response" DROP CONSTRAINT "FK_1062f8f97b7d9bcb160304c0e76"`);
        await queryRunner.query(`ALTER TABLE "activity_response" DROP COLUMN "lessonResponseId"`);
        await queryRunner.query(`COMMENT ON COLUMN "lesson_response"."status" IS 'State of the lesson for the user'`);
        await queryRunner.query(`ALTER TABLE "lesson_response" DROP COLUMN "status"`);
    }

}
