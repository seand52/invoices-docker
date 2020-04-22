import React, { useEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import Layout from 'components/Layout/Layout';
import {
  searchAll,
  deleteProduct,
  resetSuccess,
  resetError,
} from 'store/actions/productsActions';
import { InitialState } from 'store';
import { getProductState } from 'selectors/products';
import { ProductState } from 'store/reducers/productsReducer';
import Overview from 'components/Overview/Overview';
import SimpleModal from 'components/SimpleModal/SimpleModal';
import ProductDetailsForm from '../../components/Products/ProducDetailsForm/ProductDetailsForm';
import Swal from 'sweetalert2';
import { alertProp, confirmationAlert } from 'utils/swal';
import { initialState, reducer } from './localReducer';
import { useSetNavigation } from 'hooks/useSetNavigation';

interface Props {
  path: string;
  searchAll: ({ url: string }) => void;
  deleteProduct: (id: string) => void;
  resetSuccess: () => void;
  resetError: () => void;
  productState: ProductState;
}

interface Data {
  id: string;
  reference: string;
  description: string;
  price: string;
  stock: string;
  actions: 'actions';
}

export interface ProductsHeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
  currency?: boolean;
}

const headCells: ProductsHeadCell[] = [
  {
    id: 'id',
    numeric: true,
    disablePadding: true,
    label: 'ID',
  },
  {
    id: 'reference',
    numeric: false,
    disablePadding: true,
    label: 'Reference',
  },
  {
    id: 'description',
    numeric: false,
    disablePadding: true,
    label: 'Description',
  },
  {
    id: 'price',
    numeric: false,
    currency: true,
    disablePadding: true,
    label: 'Price',
  },

  {
    id: 'stock',
    numeric: false,
    disablePadding: true,
    label: 'Stock',
  },

  { id: 'actions', numeric: false, disablePadding: true, label: 'Actions' },
];

const tableActions = [
  {
    label: '',
    value: '',
  },
  {
    label: 'Edit',
    value: 'edit',
  },
  {
    label: 'Delete',
    value: 'delete',
  },
  {
    label: 'View',
    value: 'view',
  },
];

const Products = ({
  path,
  searchAll,
  productState,
  resetSuccess,
  deleteProduct: deleteProductAction,
  resetError,
}: Props) => {
  useSetNavigation('products');
  const [localState, localDispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    searchAll({
      url: `${process.env.REACT_APP_API_URL}/products?page=1&limit=15`,
    });
  }, []);

  useEffect(() => {
    if (productState.success) {
      localDispatch({ type: 'CLOSE_MODAL' });
      Swal.fire(
        alertProp({
          type: 'success',
          title: 'Success!',
          text: `Product ${localState.action} correctly`,
        }),
      );
      resetSuccess();
    }
  }, [productState.success]);

  const onSearchChange = e => {
    localDispatch({ type: 'SET_SEARCH', payload: e.target.value });
  };

  const submitSearch = e => {
    e.preventDefault();
    if (localState.search !== '') {
      searchAll({
        url: `${process.env.REACT_APP_API_URL}/products?page=1&limit=15&name=${localState.search}`,
      });
    } else {
      searchAll({
        url: `${process.env.REACT_APP_API_URL}/products?page=1&limit=15`,
      });
    }
  };

  const onSearchClear = () => {
    localDispatch({ type: 'SET_SEARCH', payload: '' });
    searchAll({
      url: `${process.env.REACT_APP_API_URL}/products?page=1&limit=15`,
    });
  };

  const addNewProduct = e => {
    e.preventDefault();
    localDispatch({ type: 'ADD_PRODUCT' });
    resetError();
  };

  const deleteProduct = (ids: string[]) => {
    Swal.fire(
      confirmationAlert({
        title: 'Are you sure you want to delete the client?',
        confirmButtonText: 'Yes, delete it!',
      }),
    ).then(result => {
      if (result.value) {
        deleteProductAction(ids[0]);
        localDispatch({ type: 'DELETE_PRODUCT' });
      }
    });
  };

  const editProduct = (id: string) => {
    localDispatch({ type: 'EDIT_PRODUCT', payload: id });
  };

  const onNextPage = newPage => {
    searchAll({
      url: `${process.env.REACT_APP_API_URL}/products?page=${newPage}&limit=${productState.products.rowsPerPage}`,
    });
  };

  const onChangeRowsPerPage = rowsPerPage => {
    const newPageCount = Math.ceil(
      productState.products.totalItems / rowsPerPage,
    );
    searchAll({
      url: `${process.env.REACT_APP_API_URL}/products?page=${
        productState.products.currentPage > newPageCount
          ? newPageCount
          : productState.products.currentPage
      }&limit=${rowsPerPage}`,
    });
  };

  return (
    <div>
      <Layout
        main={
          <Overview
            title='Products'
            searchState={localState.search}
            tableActions={tableActions}
            onSearchClear={onSearchClear}
            loading={productState.loading}
            editItem={editProduct}
            deleteItem={deleteProduct}
            tableHeader={headCells}
            tableData={productState.products}
            onAddNew={addNewProduct}
            onSearchChange={onSearchChange}
            onSubmitSearch={submitSearch}
            onNextPage={onNextPage}
            onChangeRowsPerPage={onChangeRowsPerPage}
            error={productState.error}
          />
        }
      />
      <SimpleModal
        open={localState.showModal}
        closeModal={() => localDispatch({ type: 'TOGGLE_MODAL' })}
      >
        <ProductDetailsForm selectedProduct={localState.selectedProductId} />
      </SimpleModal>
    </div>
  );
};

const mapStateToProps = (state: InitialState) => {
  return {
    productState: getProductState(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchAll: ({ url }) => dispatch(searchAll({ url })),
    deleteProduct: id => dispatch(deleteProduct(id)),
    resetSuccess: () => dispatch(resetSuccess()),
    resetError: () => dispatch(resetError()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Products);
