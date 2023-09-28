import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBase1695824021587 implements MigrationInterface {
    name = 'CreateBase1695824021587'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "admin_profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "deletedAt" TIMESTAMP, "userId" text NOT NULL, CONSTRAINT "UQ_1a272d44c2214c1e8b22a886d61" UNIQUE ("userId"), CONSTRAINT "PK_bc784ca31eb1821ba53980ca23d" PRIMARY KEY ("id")); COMMENT ON COLUMN "admin_profile"."userId" IS 'User ID associated with the profile'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "admin_profile"`);
    }

}
