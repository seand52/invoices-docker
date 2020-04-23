import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDocumentType1587582634168 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `alter table clients add column documentType ENUM ("CIF", "NIF", "INTRA", "") DEFAULT ""`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`alter table clients drop column documentType`);
  }
}
