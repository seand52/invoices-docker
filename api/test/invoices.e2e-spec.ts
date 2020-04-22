import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as bycript from 'bcrypt';
import { Users } from 'src/users/users.entity';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ProductsRepository } from '../src/products/products.repository';
import { UserRespository } from '../src/users/users.repository';
import {
  mockProducts,
  invoicesData,
  invoiceProductsData,
} from './mockResponses/clientResponses';
import { InvoicesRepository } from '../src/invoices/invoices.repository';
import { ClientsRepository } from '../src/clients/clients.repository';
import { PaymentType } from '../src/invoices/invoices.entity';
import { InvoiceToProductsRepository } from '../src/invoice-products/invoice-products.repository';
import { SalesOrdersRepository } from '../src/sales-orders/sales-orders.repository';
import { SalesOrdersToProductsRepository } from '../src/salesOrder-products/salesOrder-products.repository';
import { BusinessInfoRepository } from '../src/business-info/business-info.repository';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let userRepository: UserRespository;
  let productsRepository: ProductsRepository;
  let invoicesRepository: InvoicesRepository;
  let clientsRepository: ClientsRepository;
  let invoiceProducts: InvoiceToProductsRepository;
  let salesOrdersRepository: SalesOrdersRepository;
  let salesOrdersProductsRepository: SalesOrdersToProductsRepository;
  let businessInfoRepository: BusinessInfoRepository;

  let user: Users;
  let jwt: string;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = module.createNestApplication();
    await app.init();
    userRepository = await module.get<UserRespository>(UserRespository);
    invoicesRepository = await module.get<InvoicesRepository>(
      InvoicesRepository,
    );
    productsRepository = await module.get<ProductsRepository>(
      ProductsRepository,
    );
    clientsRepository = await module.get<ClientsRepository>(ClientsRepository);
    invoiceProducts = await module.get<InvoiceToProductsRepository>(
      InvoiceToProductsRepository,
    );
    salesOrdersRepository = await module.get<SalesOrdersRepository>(
      SalesOrdersRepository,
    );
    salesOrdersProductsRepository = await module.get<
      SalesOrdersToProductsRepository
    >(SalesOrdersToProductsRepository);
    businessInfoRepository = await module.get<BusinessInfoRepository>(
      BusinessInfoRepository,
    );
  });

  beforeEach(async () => {
    const salt = await bycript.genSalt();
    const password = await bycript.hash('1234567', salt);
    const username = `seand52-${Math.random()}`;
    user = await userRepository.save({
      username,
      password,
      salt,
    });
    const loginResponse = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username, password: '1234567' })
      .expect(201);
    jwt = loginResponse.body.access_token;
  });

  it('/ GET invoices successfully', async () => {
    const client = await clientsRepository.save({
      name: 'string',
      shopName: 'string',
      address: 'string',
      city: 'string',
      province: 'string',
      postcode: 'string',
      numNif: 'string',
      numCif: 'string',
      telephone1: 'string',
      telephone2: 'string',
      email: `client-${Math.random()}@gmail.com`,
      userId: user.id,
    });
    await invoicesRepository.save({
      ...invoicesData,
      userId: user.id,
      clientId: client.id,
    });
    return request(app.getHttpServer())
      .get('/invoices')
      .set('Authorization', 'Bearer ' + jwt)
      .expect(200)
      .then(res => {
        expect(res.body.items.length).toEqual(1);
        expect(res.body.itemCount).toEqual(1);
        expect(res.body.totalItems).toEqual(1);
      });
  });

  it('/ GET invoice by id', async () => {
    const client = await clientsRepository.save({
      name: 'string',
      shopName: 'string',
      address: 'string',
      city: 'string',
      province: 'string',
      postcode: 'string',
      numNif: 'string',
      numCif: 'string',
      telephone1: 'string',
      telephone2: 'string',
      email: `client-${Math.random()}@gmail.com`,
      userId: user.id,
    });
    const invoice = await invoicesRepository.save({
      ...invoicesData,
      userId: user.id,
      clientId: client.id,
    });
    return request(app.getHttpServer())
      .get(`/invoices/${invoice.id}`)
      .set('Authorization', 'Bearer ' + jwt)
      .expect(200)
      .then(res => {
        expect(res.body instanceof Object).toBe(true);
      });
  });

  it('/ DELETE invoice', async () => {
    const client = await clientsRepository.save({
      name: 'string',
      shopName: 'string',
      address: 'string',
      city: 'string',
      province: 'string',
      postcode: 'string',
      numNif: 'string',
      numCif: 'string',
      telephone1: 'string',
      telephone2: 'string',
      email: `client-${Math.random()}@gmail.com`,
      userId: user.id,
    });
    const invoice = await invoicesRepository.save({
      ...invoicesData,
      userId: user.id,
      clientId: client.id,
    });
    return request(app.getHttpServer())
      .delete(`/invoices/${invoice.id}`)
      .set('Authorization', 'Bearer ' + jwt)
      .expect(200);
  });

  it('/ POST invoices', async () => {
    const client = await clientsRepository.save({
      name: 'string',
      shopName: 'string',
      address: 'string',
      city: 'string',
      province: 'string',
      postcode: 'string',
      numNif: 'string',
      numCif: 'string',
      telephone1: 'string',
      telephone2: 'string',
      email: `client-${Math.random()}@gmail.com`,
      userId: user.id,
    });
    await businessInfoRepository.save({
      name: 'Company name',
      cif: '47182818G',
      address: 'calle test',
      postcode: '08001',
      city: 'Barcelona',
      country: 'Spain',
      telephone: '933281828',
      email: `companyemail-${Math.random()}@gmail.com`,
      userId: user.id,
    });
    const _mockProducts = await productsRepository.save(
      mockProducts.map(item => ({
        ...item,
        userId: user.id,
      })),
    );
    const invoicePostData = {
      settings: {
        totalPrice: 99.99,
        re: 0.052,
        tax: 0.21,
        transportPrice: 10,
        userId: 1,
        clientId: client.id,
        date: '12/12/2019',
        paymentType: PaymentType.CASH,
      },
      products: _mockProducts.map(item => ({
        id: item.id,
        quantity: 3,
        discount: 0,
        price: 20,
      })),
    };

    return request(app.getHttpServer())
      .post('/invoices')
      .send(invoicePostData)
      .set('Authorization', 'Bearer ' + jwt)
      .expect(201);
  });

  it('/ PATCH invoices', async () => {
    const client = await clientsRepository.save({
      name: 'string',
      shopName: 'string',
      address: 'string',
      city: 'string',
      province: 'string',
      postcode: 'string',
      numNif: 'string',
      numCif: 'string',
      telephone1: 'string',
      telephone2: 'string',
      email: `companyemail-${Math.random()}@gmail.com`,
      userId: user.id,
    });
    await businessInfoRepository.save({
      name: 'Company name',
      cif: '47182818G',
      address: 'calle test',
      postcode: '08001',
      city: 'Barcelona',
      country: 'Spain',
      telephone: '933281828',
      email: 'companyemail@gmail.com',
      userId: user.id,
    });
    const _mockProducts = await productsRepository.save(
      mockProducts.map(item => ({
        ...item,
        userId: user.id,
      })),
    );

    const invoice = await invoicesRepository.save({
      ...invoicesData,
      clientId: client.id,
      userId: user.id,
    });

    await invoiceProducts.save(
      invoiceProductsData.map((item, index) => ({
        ...item,
        tax: 0.21,
        invoiceId: invoice.id,
        productId: _mockProducts[index].id,
      })),
    );

    const modifiedInvoiceData = {
      settings: {
        totalPrice: 99.99,
        re: 0,
        tax: 0,
        transportPrice: 10,
        userId: 1,
        clientId: client.id,
        date: '12/12/2019',
        paymentType: PaymentType.CASH,
      },
      products: _mockProducts.map(item => ({
        id: item.id,
        quantity: 3,
        discount: 0,
        price: 20,
      })),
    };

    return request(app.getHttpServer())
      .patch(`/invoices/${invoice.id}`)
      .send(modifiedInvoiceData)
      .set('Authorization', 'Bearer ' + jwt)
      .expect(200);
  });

  it(`/POST invoices/transform should convert a sales order to an invoice and remove the
  sales order and associated products in sales_order_products table`, async () => {
    const client = await clientsRepository.save({
      name: 'string',
      shopName: 'string',
      address: 'string',
      city: 'string',
      province: 'string',
      postcode: 'string',
      numNif: 'string',
      numCif: 'string',
      telephone1: 'string',
      telephone2: 'string',
      email: `client-${Math.random()}@gmail.com`,
      userId: user.id,
    });

    const _mockProducts = await productsRepository.save(
      mockProducts.map(item => ({
        ...item,
        userId: user.id,
      })),
    );

    const salesOrder = await salesOrdersRepository.save({
      ...invoicesData,
      clientId: client.id,
      userId: user.id,
    });
    await salesOrdersProductsRepository.save(
      invoiceProductsData.map((item, index) => ({
        ...item,
        tax: 0.21,
        salesOrderId: salesOrder.id,
        productId: _mockProducts[index].id,
      })),
    );
    const invoicePostData = {
      settings: {
        totalPrice: 99.99,
        re: 0.052,
        tax: 0.21,
        transportPrice: 10,
        userId: 1,
        clientId: client.id,
        date: '12/12/2019',
        paymentType: PaymentType.CASH,
      },
      products: _mockProducts.map(item => ({
        id: item.id,
        quantity: 3,
        discount: 0,
        price: 20,
      })),
    };

    return request(app.getHttpServer())
      .post(`/invoices/transform-sales-order/${salesOrder.id}`)
      .send(invoicePostData)
      .set('Authorization', 'Bearer ' + jwt)
      .expect(201)
      .then(async res => {
        const _salesOrder = await salesOrdersRepository.findOne(salesOrder.id);
        expect(_salesOrder).toBeFalsy();
        const _salesOrderProducts = await salesOrdersProductsRepository.find({
          salesOrderId: salesOrder.id,
        });
        expect(_salesOrderProducts.length).toEqual(0);
        const _invoice = await invoicesRepository.find({ clientId: client.id });
        expect(_invoice.length).toEqual(1);
        const _invoiceProducts = await invoiceProducts.find({
          invoiceId: _invoice[0].id,
        });
        expect(_invoiceProducts.length).toEqual(4);
      });
  });

  afterEach(async () => {
    // await userRepository.query(`DELETE FROM USERS WHERE id =${user.id}`);
  });
  afterAll(async () => {
    await userRepository.query(`DELETE FROM USERS WHERE id =${user.id}`);
    // await invoicesRepository.query('DELETE FROM invoices;');
    // await salesOrdersRepository.query('DELETE FROM sales_orders;');
    // await clientsRepository.query('DELETE FROM clients;');
    // await clientsRepository.query('DELETE FROM products;');
    await app.close();
  });
});
