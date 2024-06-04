import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTblOrdersOpShipping1717169568738 implements MigrationInterface {
    name = 'AddTblOrdersOpShipping1717169568738'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "shippings" ("id" SERIAL NOT NULL, "name" character varying NOT NULL DEFAULT '', "phone" character varying NOT NULL, "email" character varying NOT NULL, "address" character varying NOT NULL, "city" character varying NOT NULL DEFAULT '', "postcode" character varying NOT NULL DEFAULT '', "state" character varying NOT NULL DEFAULT '', "country" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_665fb613135782a598a2b47e5b2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders_products" ("id" SERIAL NOT NULL, "product_unit_price" numeric(10,2) NOT NULL DEFAULT '0', "product_quantity" integer NOT NULL, "orderId" integer, "productId" integer, CONSTRAINT "PK_4945c6758fd65ffacda760b4ac9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."orders_status_enum" AS ENUM('PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED')`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, "orderAt" TIMESTAMP NOT NULL DEFAULT now(), "status" "public"."orders_status_enum" NOT NULL DEFAULT 'PROCESSING', "shippedAt" TIMESTAMP, "deliveredAt" TIMESTAMP, "updatedById" integer, "shippingId" integer, CONSTRAINT "REL_fa7fbee142ce934fec2862889a" UNIQUE ("shippingId"), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "orders_products" ADD CONSTRAINT "FK_823bad3524a5d095453c43286bb" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders_products" ADD CONSTRAINT "FK_4eff63e89274f79195e25c5c115" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_1102b5a0c580f845993e2f766f6" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_fa7fbee142ce934fec2862889ac" FOREIGN KEY ("shippingId") REFERENCES "shippings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_fa7fbee142ce934fec2862889ac"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_1102b5a0c580f845993e2f766f6"`);
        await queryRunner.query(`ALTER TABLE "orders_products" DROP CONSTRAINT "FK_4eff63e89274f79195e25c5c115"`);
        await queryRunner.query(`ALTER TABLE "orders_products" DROP CONSTRAINT "FK_823bad3524a5d095453c43286bb"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TYPE "public"."orders_status_enum"`);
        await queryRunner.query(`DROP TABLE "orders_products"`);
        await queryRunner.query(`DROP TABLE "shippings"`);
    }

}
