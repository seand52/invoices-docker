import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { BusinessInfoModule } from './business-info/business-info.module';
import { ClientsModule } from './clients/clients.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { InvoicesModule } from './invoices/invoices.module';
import { ProductsModule } from './products/products.module';
import { SalesOrdersModule } from './sales-orders/sales-orders.module';
import { UsersModule } from './users/users.module';

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
        host: configService.get('MYSQL_HOST'),
        port: configService.get('MYSQL_PORT'),
        username: configService.get('MYSQL_USER'),
        password: configService.get('MYSQL_PASSWORD'),
        database: configService.get('MYSQL_DATABASE'),
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
