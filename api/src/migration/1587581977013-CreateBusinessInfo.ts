import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBusinessInfo1587581977013 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      ` CREATE TABLE business_info (
        id int NOT NULL AUTO_INCREMENT,
        name varchar(100) NOT NULL,
        cif varchar(11) NOT NULL,
        address varchar(255) NOT NULL,
        postcode varchar(7) NOT NULL,
        city varchar(30) NOT NULL,
        country varchar(30) NOT NULL,
        telephone varchar(12) NOT NULL,
        email varchar(55) NOT NULL,
        userId int NOT NULL,
        createdAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updatedAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX IDX_3f13cf246be44b24f043c29d03 (email),
        PRIMARY KEY (id),
        CONSTRAINT FK_62fd474883500f6b2189ae184e1 FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE ON UPDATE NO ACTION
        ) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DROP TABLE business_info');
  }
}
