import { MigrationInterface, QueryRunner } from "typeorm";

export class auto1678046111987 implements MigrationInterface {
    name = 'auto1678046111987'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('admin', 'supervisor', 'customer')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying(25) NOT NULL, "surname" character varying(25) NOT NULL, "phone" character varying(18) NOT NULL, "email" character varying(40) NOT NULL, "password" character varying(255) NOT NULL, "token" uuid NOT NULL, "vk_link" character varying(50) NOT NULL, "tg_link" character varying(20) NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'customer', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    }

}
