import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdminProfile1694510434923 implements MigrationInterface {
  name = 'AdminProfile1694510434923';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "admin_profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "deletedAt" TIMESTAMP, "userId" text NOT NULL, CONSTRAINT "UQ_1a272d44c2214c1e8b22a886d61" UNIQUE ("userId"), CONSTRAINT "PK_bc784ca31eb1821ba53980ca23d" PRIMARY KEY ("id")); COMMENT ON COLUMN "admin_profile"."userId" IS 'User ID associated with the profile'`,
    );
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
    await queryRunner.query(`DROP TABLE "admin_profile"`);
  }
}
