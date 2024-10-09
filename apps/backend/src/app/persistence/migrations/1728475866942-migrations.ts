import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1728475866942 implements MigrationInterface {
    name = 'Migrations1728475866942'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`address\` ADD UNIQUE INDEX \`IDX_cc936c1e21dbcda4a0e9e7fe83\` (\`value\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`address_value_unique\` ON \`address\` (\`value\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`address_value_unique\` ON \`address\``);
        await queryRunner.query(`ALTER TABLE \`address\` DROP INDEX \`IDX_cc936c1e21dbcda4a0e9e7fe83\``);
    }

}
