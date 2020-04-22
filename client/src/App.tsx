import React, { useEffect } from 'react';
import { Router } from '@reach/router';
import 'App.scss';
import LoginContainer from 'pages/Login/LoginContainer';
import RegisterContainer from 'pages/Register/RegisterContainer';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';
import Clients from 'pages/Clients/Clients';
import PublicRoute from 'components/PublicRoute/PublicRoute';
import Products from 'pages/Products/Products';
import Invoices from 'pages/Invoices/Invoices';
import NewInvoice from 'components/Invoices/NewInvoice/NewInvoice';
import EditInvoice from 'components/Invoices/EditInvoice/EditInvoice';
import SalesOrders from 'pages/SalesOrders/SalesOrders';
import NewSalesOrder from 'components/SalesOrders/NewSalesOrder/NewSalesOrder';
import EditSalesOrder from 'components/SalesOrders/EditSalesOrder/EditSalesOrder';
import BusinessInfo from 'pages/BusinessInfo/BusinessInfo';

const App: React.FC = () => {
  return (
    <div className='App'>
      <Router>
        <PublicRoute component={LoginContainer} path='/' />
        <PublicRoute component={LoginContainer} path='/login' />
        <PublicRoute component={RegisterContainer} path='/register' />

        <PrivateRoute path='/clients' component={Clients} />

        <PrivateRoute path='/products' component={Products} />

        <PrivateRoute path='/invoices' component={Invoices} />
        <PrivateRoute path='/invoices/new' component={NewInvoice} />
        <PrivateRoute path='/invoice/:invoiceId/edit' component={EditInvoice} />

        <PrivateRoute path='/sales-orders' component={SalesOrders} />
        <PrivateRoute path='/sales-order/new' component={NewSalesOrder} />
        <PrivateRoute
          path='/sales-order/:salesOrderId/edit'
          component={EditSalesOrder}
        />

        <PrivateRoute path='/business-info' component={BusinessInfo} />
      </Router>
    </div>
  );
};

export default App;
