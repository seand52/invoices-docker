import { MigrationInterface, QueryRunner } from 'typeorm';

export class ModifyDocumentType1587582686962 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE clients MODIFY COLUMN documentType ENUM ("CIF", "NIF", "INTRA", "PASSPORT", "") DEFAULT ""`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE clients MODIFY COLUMN documentType ENUM ("CIF", "NIF", "INTRA", "") DEFAULT ""`,
    );
  }
}
