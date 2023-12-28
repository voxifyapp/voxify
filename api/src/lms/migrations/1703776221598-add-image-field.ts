import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImageField1703776221598 implements MigrationInterface {
    name = 'AddImageField1703776221598'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lesson" ADD "homeImageFileName" character varying`);
        await queryRunner.query(`COMMENT ON COLUMN "lesson"."homeImageFileName" IS 'The image for the lesson that will be displayed on the home screen'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "lesson"."homeImageFileName" IS 'The image for the lesson that will be displayed on the home screen'`);
        await queryRunner.query(`ALTER TABLE "lesson" DROP COLUMN "homeImageFileName"`);
    }

}
