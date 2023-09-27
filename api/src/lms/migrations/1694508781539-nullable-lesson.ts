import { MigrationInterface, QueryRunner } from 'typeorm';

export class NullableLesson1694508781539 implements MigrationInterface {
  name = 'NullableLesson1694508781539';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "activity" DROP CONSTRAINT "FK_9a6cba12fc18f7a368387fed85a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "activity" ALTER COLUMN "lessonId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "activity" ADD CONSTRAINT "FK_9a6cba12fc18f7a368387fed85a" FOREIGN KEY ("lessonId") REFERENCES "lesson"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "activity" DROP CONSTRAINT "FK_9a6cba12fc18f7a368387fed85a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "activity" ALTER COLUMN "lessonId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "activity" ADD CONSTRAINT "FK_9a6cba12fc18f7a368387fed85a" FOREIGN KEY ("lessonId") REFERENCES "lesson"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }
}
