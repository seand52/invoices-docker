import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropNumCif1587582657050 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`alter table clients drop column numCif`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `alter table clients add column numCif VARCHAR(100) NOT NULL DEFAULT ""`,
    );
  }
}
