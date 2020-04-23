import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInvoiceToProducts1587582344413
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE invoice_to_products (
        id int NOT NULL AUTO_INCREMENT,
        invoiceId int NOT NULL,
        quantity int NOT NULL,
        discount decimal(10,3) NOT NULL DEFAULT 0,
        price decimal(10,2) NOT NULL DEFAULT 0,
        reference varchar(55) NOT NULL DEFAULT '',
        description varchar(55) NOT NULL DEFAULT '',
        PRIMARY KEY (id),
        CONSTRAINT FK_4067b14e511c3dd476295146603 FOREIGN KEY (invoiceId) REFERENCES invoices(id) ON DELETE CASCADE ON UPDATE NO ACTION
        ) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DROP TABLE invoice_to_products');
  }
}
