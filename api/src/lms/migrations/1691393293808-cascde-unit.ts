import { MigrationInterface, QueryRunner } from 'typeorm';

export class CascdeUnit1691393293808 implements MigrationInterface {
  name = 'CascdeUnit1691393293808';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "unit" DROP CONSTRAINT "FK_c88f881f8a9aa8be02740289776"`,
    );
    await queryRunner.query(
      `ALTER TABLE "unit" ADD CONSTRAINT "FK_c88f881f8a9aa8be02740289776" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "unit" DROP CONSTRAINT "FK_c88f881f8a9aa8be02740289776"`,
    );
    await queryRunner.query(
      `ALTER TABLE "unit" ADD CONSTRAINT "FK_c88f881f8a9aa8be02740289776" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
