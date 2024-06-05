import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTblPayments1717509205197 implements MigrationInterface {
    name = 'AddTblPayments1717509205197'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ADD "amount" integer NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "currency" character(3) NOT NULL DEFAULT 'USD'`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "paymentIntentId" character varying`);
        await queryRunner.query(`ALTER TABLE "shippings" ALTER COLUMN "phone" DROP NOT NULL`);
        await queryRunner.query(`ALTER TYPE "public"."orders_status_enum" RENAME TO "orders_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."orders_status_enum" AS ENUM('PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'PAID')`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "status" TYPE "public"."orders_status_enum" USING "status"::"text"::"public"."orders_status_enum"`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'PROCESSING'`);
        await queryRunner.query(`DROP TYPE "public"."orders_status_enum_old"`);
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."orders_status_enum_old" AS ENUM('PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED')`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "status" TYPE "public"."orders_status_enum_old" USING "status"::"text"::"public"."orders_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'PROCESSING'`);
        await queryRunner.query(`DROP TYPE "public"."orders_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."orders_status_enum_old" RENAME TO "orders_status_enum"`);
        await queryRunner.query(`ALTER TABLE "shippings" ALTER COLUMN "phone" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "paymentIntentId"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "currency"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "amount"`);
    }
    
    

}
