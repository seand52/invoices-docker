import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSalesOrders1587582159130 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE sales_orders (
            id int NOT NULL AUTO_INCREMENT,
            totalPrice decimal(10,2) NOT NULL DEFAULT 0,
            re decimal(10,3) NOT NULL DEFAULT 0,
            tax decimal(10,2) NOT NULL DEFAULT 0,
            transportPrice decimal(10,2) NOT NULL DEFAULT 0,
            paymentType enum ("Efectivo", "Transferencia", "Tarjeta") NOT NULL DEFAULT "Transferencia",
            userId int NOT NULL,
            clientId int NOT NULL,
            date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            expirationDate timestamp NULL,
            expired tinyint(1) NOT NULL DEFAULT 0,
            createdAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
            updatedAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
            PRIMARY KEY (id),
            CONSTRAINT FK_efea3fff06a644a0ced31cf03cc FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE ON UPDATE NO ACTION,
            CONSTRAINT FK_b2a14bbd78f41ca62f120689fae FOREIGN KEY (clientId) REFERENCES clients(id) ON DELETE CASCADE ON UPDATE NO ACTION
            ) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DROP TABLE sales_orders');
  }
}
