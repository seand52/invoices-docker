import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateClients1587582029972 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE clients (
        id int NOT NULL AUTO_INCREMENT,
        name varchar(80) NOT NULL DEFAULT '',
        shopName varchar(80) NOT NULL DEFAULT '',
        address varchar(255) NOT NULL DEFAULT '',
        city varchar(255) NOT NULL DEFAULT '',
        province varchar(55) NOT NULL DEFAULT '',
        postcode varchar(7) NOT NULL DEFAULT '',
        numNif varchar(12) NOT NULL DEFAULT '',
        numCif varchar(12) NOT NULL DEFAULT '',
        telephone1 varchar(12) NOT NULL DEFAULT '',
        telephone2 varchar(12) NOT NULL DEFAULT '',
        email varchar(55) NOT NULL DEFAULT '',
        userId int NOT NULL,
        createdAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updatedAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        UNIQUE INDEX IDX_b48860677afe62cd96e1265948 (email),
        PRIMARY KEY (id),
        CONSTRAINT FK_59c1e5e51addd6ebebf76230b37 FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE ON UPDATE NO ACTION
        ) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DROP TABLE clients');
  }
}
