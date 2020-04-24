import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

import { AuthModule } from './auth/auth.module';
import { BusinessInfoModule } from './business-info/business-info.module';
import { ClientsModule } from './clients/clients.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { InvoicesModule } from './invoices/invoices.module';
import { ProductsModule } from './products/products.module';
import { SalesOrdersModule } from './sales-orders/sales-orders.module';
import { UsersModule } from './users/users.module';

dotenv.config();
@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRootAsync({
      //@ts-ignore
      retryAttempts: 5,
      retryDelay: 3000,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService): Promise<any> => ({
        type: 'mysql',
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false,
        migrations: [__dirname + '/migration/*.ts'],
        cli: {
          migrationsDir: 'migration',
        },
        logging: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    ClientsModule,
    ProductsModule,
    BusinessInfoModule,
    InvoicesModule,
    SalesOrdersModule,
  ],
})
export class AppModule { }
