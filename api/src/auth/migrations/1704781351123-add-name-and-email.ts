import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNameAndEmail1704781351123 implements MigrationInterface {
  name = 'AddNameAndEmail1704781351123';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "profile" ADD "fullName" text`);
    await queryRunner.query(
      `COMMENT ON COLUMN "profile"."fullName" IS 'Name of the user'`,
    );
    await queryRunner.query(`ALTER TABLE "profile" ADD "email" text`);
    await queryRunner.query(
      `COMMENT ON COLUMN "profile"."email" IS 'Email of the user'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `COMMENT ON COLUMN "profile"."email" IS 'Email of the user'`,
    );
    await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "email"`);
    await queryRunner.query(
      `COMMENT ON COLUMN "profile"."fullName" IS 'Name of the user'`,
    );
    await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "fullName"`);
  }
}
