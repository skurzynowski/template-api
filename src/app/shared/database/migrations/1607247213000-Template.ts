import { MigrationInterface, QueryRunner } from 'typeorm';

export class Template1607247213000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
       ALTER TABLE "templates" ADD COLUMN IF NOT EXISTS "file" bytea;
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
       ALTER TABLE "templates" DROP COLUMN IF EXISTS "file";
      `,
    );
  }
}
