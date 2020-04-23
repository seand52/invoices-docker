import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInvoices1587582278933 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE invoices (
        id int NOT NULL AUTO_INCREMENT,
        totalPrice decimal(10,2) NOT NULL DEFAULT 0,
        re decimal(10,3) NOT NULL DEFAULT 0,
        tax decimal(10,2) NOT NULL DEFAULT 0,
        transportPrice decimal(10,2) NOT NULL DEFAULT 0,
        paymentType enum ("Efectivo", "Transferencia", "Tarjeta") NOT NULL DEFAULT "Transferencia",
        userId int NOT NULL,
        clientId int NOT NULL,
        date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        createdAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updatedAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        PRIMARY KEY (id),
        CONSTRAINT FK_fcbe490dc37a1abf68f19c5ccb9 FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE ON UPDATE NO ACTION,
        CONSTRAINT FK_d9df936180710f9968da7cf4a51 FOREIGN KEY (clientId) REFERENCES clients(id) ON DELETE CASCADE ON UPDATE NO ACTION
        ) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DROP TABLE invoices');
  }
}
