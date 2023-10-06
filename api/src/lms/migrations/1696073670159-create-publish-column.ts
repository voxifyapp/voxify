import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePublishColumn1696073670159 implements MigrationInterface {
    name = 'CreatePublishColumn1696073670159'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unit" ADD "published" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`COMMENT ON COLUMN "unit"."published" IS 'Is this visible to users'`);
        await queryRunner.query(`ALTER TABLE "lesson" ADD "published" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`COMMENT ON COLUMN "lesson"."published" IS 'Is this visible to users'`);
        await queryRunner.query(`ALTER TABLE "activity" ADD "published" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`COMMENT ON COLUMN "activity"."published" IS 'Is this visible to users'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "activity"."published" IS 'Is this visible to users'`);
        await queryRunner.query(`ALTER TABLE "activity" DROP COLUMN "published"`);
        await queryRunner.query(`COMMENT ON COLUMN "lesson"."published" IS 'Is this visible to users'`);
        await queryRunner.query(`ALTER TABLE "lesson" DROP COLUMN "published"`);
        await queryRunner.query(`COMMENT ON COLUMN "unit"."published" IS 'Is this visible to users'`);
        await queryRunner.query(`ALTER TABLE "unit" DROP COLUMN "published"`);
    }

}
