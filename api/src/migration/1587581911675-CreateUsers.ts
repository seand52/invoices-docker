import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1587581911675 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE users (
        id int NOT NULL AUTO_INCREMENT,
        username varchar(255) NOT NULL,
        password varchar(255) NOT NULL,
        salt varchar(255) NOT NULL,
        createdAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updatedAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        UNIQUE INDEX IDX_fe0bb3f6520ee0469504521e71 (username),
        PRIMARY KEY (id)
        ) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DROP TABLE users');
  }
}
