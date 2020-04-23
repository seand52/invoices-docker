import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSalesOrdersToProducts1587582227958
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE sales_order_to_products (
        id int NOT NULL AUTO_INCREMENT,
        salesOrderId int NOT NULL,
        quantity int NOT NULL,
        discount decimal(10,3) NOT NULL DEFAULT 0,
        price decimal(10,2) NOT NULL DEFAULT 0,
        reference varchar(100) NOT NULL DEFAULT '',
        description varchar(100) NOT NULL DEFAULT '',
        PRIMARY KEY (id),
        CONSTRAINT FK_8c76ed8f62ac6e0b30abf7f653d FOREIGN KEY (salesOrderId) REFERENCES sales_orders(id) ON DELETE CASCADE ON UPDATE NO ACTION
        ) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DROP TABLE sales_order_to_products');
  }
}
