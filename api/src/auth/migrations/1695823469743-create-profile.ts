import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProfile1695823469743 implements MigrationInterface {
    name = 'CreateProfile1695823469743'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."profile_proficiencylevel_enum" AS ENUM('Beginner', 'Medium', 'Advanced')`);
        await queryRunner.query(`CREATE TABLE "profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "deletedAt" TIMESTAMP, "proficiencyLevel" "public"."profile_proficiencylevel_enum", "subscriptionEndDate" date, "userId" text NOT NULL, CONSTRAINT "UQ_a24972ebd73b106250713dcddd9" UNIQUE ("userId"), CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id")); COMMENT ON COLUMN "profile"."proficiencyLevel" IS 'Proficiency level of the user'; COMMENT ON COLUMN "profile"."subscriptionEndDate" IS 'Controls access to the platform, for now we need to just set it to some date based on free trial'; COMMENT ON COLUMN "profile"."userId" IS 'User ID associated with the profile'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "profile"`);
        await queryRunner.query(`DROP TYPE "public"."profile_proficiencylevel_enum"`);
    }

}
