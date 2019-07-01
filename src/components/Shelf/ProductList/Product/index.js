import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Thumb from '../../../Thumb';
import { addProduct } from '../../../../services/cart/actions';

const Product = ({ product, addProduct }) => {
  product.quantity = 1

  return (
    <div
      className="shelf-item"
      onClick={() => addProduct(product)}
    >
      <Thumb
        classes="shelf-item__thumb"
        src={product.photo}
        alt={product.title}
      />
      <p className="shelf-item__title">{product.title}</p>
      <div className="shelf-item__price">
        <div className="val">
          <b>{product.price} </b>
          <small>pontos</small>
        </div>
      </div>
      <div className="shelf-item__buy-btn">Adicionar ao carrinho</div>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
  addProduct: PropTypes.func.isRequired
};

export default connect(
  null,
  { addProduct }
)(Product);
