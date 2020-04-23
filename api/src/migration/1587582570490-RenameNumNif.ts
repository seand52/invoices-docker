import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameNumNif1587582570490 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE clients CHANGE numNif documentNum VARCHAR(100) NOT NULL DEFAULT ""`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE clients CHANGE documentNum numNif VARCHAR(100) NOT NULL DEFAULT ""`,
    );
  }
}
