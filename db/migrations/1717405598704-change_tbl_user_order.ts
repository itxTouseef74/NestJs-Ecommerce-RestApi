import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeTblUserOrder1717405598704 implements MigrationInterface {
    name = 'ChangeTblUserOrder1717405598704'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_fa7fbee142ce934fec2862889ac"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "REL_fa7fbee142ce934fec2862889a"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "shippingId"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "shippingAddressId" integer`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "UQ_cc4e4adab232e8c05026b2f345d" UNIQUE ("shippingAddressId")`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_cc4e4adab232e8c05026b2f345d" FOREIGN KEY ("shippingAddressId") REFERENCES "shippings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_cc4e4adab232e8c05026b2f345d"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "UQ_cc4e4adab232e8c05026b2f345d"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "shippingAddressId"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "shippingId" integer`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "REL_fa7fbee142ce934fec2862889a" UNIQUE ("shippingId")`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_fa7fbee142ce934fec2862889ac" FOREIGN KEY ("shippingId") REFERENCES "shippings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
