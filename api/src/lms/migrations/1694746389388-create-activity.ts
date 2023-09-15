import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateActivity1694746389388 implements MigrationInterface {
  name = 'CreateActivity1694746389388';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "activity" ADD "heading" text NOT NULL`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "activity"."heading" IS 'The heading of the activity'`,
    );
    await queryRunner.query(
      `ALTER TABLE "activity" DROP CONSTRAINT "FK_9a6cba12fc18f7a368387fed85a"`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."activity_type_enum" RENAME TO "activity_type_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."activity_type_enum" AS ENUM('VIDEO', 'FILL_IN_THE_BLANKS', 'MULTIPLE_CHOICE', 'PRONUNCIATION', 'FORM_A_SENTENCE', 'TEXT')`,
    );
    await queryRunner.query(
      `ALTER TABLE "activity" ALTER COLUMN "type" TYPE "public"."activity_type_enum" USING "type"::"text"::"public"."activity_type_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."activity_type_enum_old"`);
    await queryRunner.query(
      `ALTER TABLE "activity" ALTER COLUMN "lessonId" SET NOT NULL`,
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
      `ALTER TABLE "activity" ALTER COLUMN "lessonId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."activity_type_enum_old" AS ENUM('VIDEO', 'FILL_IN_THE_BLANKS', 'MULTIPLE_CHOICE', 'PRONUNCIATION', 'FORM_A_SENTENCE')`,
    );
    await queryRunner.query(
      `ALTER TABLE "activity" ALTER COLUMN "type" TYPE "public"."activity_type_enum_old" USING "type"::"text"::"public"."activity_type_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."activity_type_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."activity_type_enum_old" RENAME TO "activity_type_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "activity" ADD CONSTRAINT "FK_9a6cba12fc18f7a368387fed85a" FOREIGN KEY ("lessonId") REFERENCES "lesson"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "activity"."heading" IS 'The heading of the activity'`,
    );
    await queryRunner.query(`ALTER TABLE "activity" DROP COLUMN "heading"`);
  }
}
