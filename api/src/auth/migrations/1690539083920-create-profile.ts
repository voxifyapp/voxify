import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProfile1690539083920 implements MigrationInterface {
  name = 'CreateProfile1690539083920';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."profile_proficiencylevel_enum" AS ENUM('Beginner', 'Medium', 'Advanced')`,
    );
    await queryRunner.query(
      `CREATE TABLE "profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "deletedAt" TIMESTAMP, "proficiencyLevel" "public"."profile_proficiencylevel_enum", "subscriptionEndDate" date, "userId" text NOT NULL, CONSTRAINT "UQ_a24972ebd73b106250713dcddd9" UNIQUE ("userId"), CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "profile"`);
    await queryRunner.query(
      `DROP TYPE "public"."profile_proficiencylevel_enum"`,
    );
  }
}
