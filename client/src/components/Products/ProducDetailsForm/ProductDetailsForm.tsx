import { TextField } from '@material-ui/core';
import ButtonWithSpinner from 'components/ButtonWithSpinner/ButtonWithSpinner';
import { ICreateProduct } from 'forms/formValidations/add-product';
import useFormBuilder from 'hooks/useFormBuilder';
import React from 'react';
import { connect } from 'react-redux';
import { getProductState } from 'selectors/products';
import { newProduct, updateProduct } from 'store/actions/productsActions';
import { ProductState } from 'store/reducers/productsReducer';
import styles from './ProductDetailsForm.module.scss';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';

interface Props {
  createProduct: (data: ICreateProduct) => void;
  updateProduct: (data: ICreateProduct, id: string) => void;
  productState: ProductState;
  selectedProduct: null | string;
}
const ProductDetailsForm = ({
  createProduct,
  updateProduct,
  productState,
  selectedProduct,
}: Props) => {
  const products = productState.products.items;
  const product = products.find(item => item.id.toString() === selectedProduct);
  const { register, handleSubmit, errors } = useFormBuilder({
    key: 'createProductsFields',
  });

  const onSubmit = (data: ICreateProduct) => {
    if (!product) {
      createProduct(data);
    } else {
      updateProduct(data, product.id.toString());
    }
  };
  return (
    //@ts-ignore
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form_wrapper}>
      <h1>Please fill in the clients details</h1>
      <div className={styles.form_items}>
        <TextField
          defaultValue={product && product.reference}
          error={errors['reference'] ? true : false}
          helperText={errors['reference'] ? errors['reference'].message : null}
          inputRef={register}
          name='reference'
          label='Reference*'
          margin='normal'
          variant='outlined'
        />
        <TextField
          defaultValue={product && product.description}
          error={errors['description'] ? true : false}
          helperText={
            errors['description'] ? errors['description'].message : null
          }
          inputRef={register}
          name='description'
          label='Description*'
          margin='normal'
          variant='outlined'
        />
        <TextField
          defaultValue={product && product.price}
          error={errors['price'] ? true : false}
          helperText={errors['price'] ? errors['price'].message : null}
          name='price'
          inputRef={register}
          label='Price'
          variant='outlined'
          type='text'
          className={styles.textField}
          margin='normal'
        />
      </div>
      <div className={styles.button_container}>
        <ButtonWithSpinner
          loading={productState.loading}
          success={productState.success}
          type='submit'
          text='Submit Details'
        />
      </div>
      {productState.formError && (
        <ErrorMessage>{productState.formError}</ErrorMessage>
      )}
    </form>
  );
};

const mapStateToProps = (state: any) => {
  return {
    productState: getProductState(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    createProduct: (data: ICreateProduct) => dispatch(newProduct(data)),
    updateProduct: (data: ICreateProduct, id: string) =>
      dispatch(updateProduct(data, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailsForm);
