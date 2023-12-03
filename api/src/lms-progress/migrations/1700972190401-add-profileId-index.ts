import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProfileIdIndex1700972190401 implements MigrationInterface {
    name = 'AddProfileIdIndex1700972190401'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_90f1b4985f527246a27157801a" ON "lesson_response" ("profileId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e8f1b2a04aace99758769195c8" ON "activity_response" ("profileId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6bfda697ccfbf362f3a69e536b" ON "unit_response" ("profileId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_6bfda697ccfbf362f3a69e536b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e8f1b2a04aace99758769195c8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_90f1b4985f527246a27157801a"`);
    }

}
