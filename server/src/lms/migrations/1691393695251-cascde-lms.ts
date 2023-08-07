import { MigrationInterface, QueryRunner } from "typeorm";

export class CascdeLms1691393695251 implements MigrationInterface {
    name = 'CascdeLms1691393695251'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unit" DROP CONSTRAINT "FK_c88f881f8a9aa8be02740289776"`);
        await queryRunner.query(`ALTER TABLE "lesson" DROP CONSTRAINT "FK_2e4ec2ae66c028d3b20f8ff0eb9"`);
        await queryRunner.query(`ALTER TABLE "activity" DROP CONSTRAINT "FK_9a6cba12fc18f7a368387fed85a"`);
        await queryRunner.query(`ALTER TABLE "unit" ADD CONSTRAINT "FK_c88f881f8a9aa8be02740289776" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lesson" ADD CONSTRAINT "FK_2e4ec2ae66c028d3b20f8ff0eb9" FOREIGN KEY ("unitId") REFERENCES "unit"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "activity" ADD CONSTRAINT "FK_9a6cba12fc18f7a368387fed85a" FOREIGN KEY ("lessonId") REFERENCES "lesson"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "activity" DROP CONSTRAINT "FK_9a6cba12fc18f7a368387fed85a"`);
        await queryRunner.query(`ALTER TABLE "lesson" DROP CONSTRAINT "FK_2e4ec2ae66c028d3b20f8ff0eb9"`);
        await queryRunner.query(`ALTER TABLE "unit" DROP CONSTRAINT "FK_c88f881f8a9aa8be02740289776"`);
        await queryRunner.query(`ALTER TABLE "activity" ADD CONSTRAINT "FK_9a6cba12fc18f7a368387fed85a" FOREIGN KEY ("lessonId") REFERENCES "lesson"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lesson" ADD CONSTRAINT "FK_2e4ec2ae66c028d3b20f8ff0eb9" FOREIGN KEY ("unitId") REFERENCES "unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "unit" ADD CONSTRAINT "FK_c88f881f8a9aa8be02740289776" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
