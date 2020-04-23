import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProducts1587582082917 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE products (
        id int NOT NULL AUTO_INCREMENT,
        reference varchar(100) NOT NULL,
        description varchar(100) NOT NULL,
        price decimal(10,2) NOT NULL,
        userId int NOT NULL,
        createdAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updatedAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
         PRIMARY KEY (id),
         CONSTRAINT FK_99d90c2a483d79f3b627fb1d5e9 FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE ON UPDATE NO ACTION
        ) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DROP TABLE products');
  }
}
