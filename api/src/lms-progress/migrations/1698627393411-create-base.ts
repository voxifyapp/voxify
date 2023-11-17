import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBase1698627393411 implements MigrationInterface {
    name = 'CreateBase1698627393411'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "activity_response" DROP CONSTRAINT "FK_1062f8f97b7d9bcb160304c0e76"`);
        await queryRunner.query(`ALTER TABLE "activity_response" ALTER COLUMN "lessonResponseId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "activity_response" ADD CONSTRAINT "FK_1062f8f97b7d9bcb160304c0e76" FOREIGN KEY ("lessonResponseId") REFERENCES "lesson_response"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "activity_response" DROP CONSTRAINT "FK_1062f8f97b7d9bcb160304c0e76"`);
        await queryRunner.query(`ALTER TABLE "activity_response" ALTER COLUMN "lessonResponseId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "activity_response" ADD CONSTRAINT "FK_1062f8f97b7d9bcb160304c0e76" FOREIGN KEY ("lessonResponseId") REFERENCES "lesson_response"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
