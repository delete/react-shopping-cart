import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import {
  loadCart,
  removeProduct,
  checkoutCart
} from '../../services/cart/actions';
import { updateCart } from '../../services/total/actions';
import CartProduct from './CartProduct';

import './style.scss';
import Spinner from '../Spinner';
import { SessionContext } from '../SessionProvider';
import { toast } from 'react-toastify';
import { Drawer } from '../Drawer';

class FloatCart extends Component {
  static propTypes = {
    loadCart: PropTypes.func.isRequired,
    updateCart: PropTypes.func.isRequired,
    cartProducts: PropTypes.array.isRequired,
    newProduct: PropTypes.object,
    removeProduct: PropTypes.func,
    productToRemove: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      isLoading: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newProduct !== this.props.newProduct) {
      this.addProduct(nextProps.newProduct);
    }

    if (nextProps.productToRemove !== this.props.productToRemove) {
      this.removeProduct(nextProps.productToRemove);
    }
  }

  openFloatCart = () => {
    this.setState({ isOpen: true });
  };

  closeFloatCart = () => {
    this.setState({ isOpen: false });
  };

  addProduct = product => {
    const { cartProducts, updateCart } = this.props;
    let productAlreadyInCart = false;

    cartProducts.forEach(cp => {
      if (cp.id === product.id) {
        cp.quantity += product.quantity;
        productAlreadyInCart = true;
      }
    });

    if (!productAlreadyInCart) {
      cartProducts.push(product);
    }

    updateCart(cartProducts);
    this.openFloatCart();
  };

  removeProduct = product => {
    const { cartProducts, updateCart } = this.props;

    const index = cartProducts.findIndex(p => p.id === product.id);
    if (index >= 0) {
      cartProducts.splice(index, 1);
      updateCart(cartProducts);
    }
  };

  proceedToCheckout = user => {
    const { totalPrice, productQuantity } = this.props.cartTotal;

    const { cartProducts } = this.props;

    if (!productQuantity || !cartProducts.length) {
      toast.warn('Adicione alguns produtos no carrinho.');
    } else if (user.points < totalPrice) {
      toast.warn('Você não possui pontos o suficiente. :(');
    } else {
      this.setState({ isLoading: true });
      this.props.checkoutCart(cartProducts, user, totalPrice, () =>
        this.setState({ isLoading: false })
      );
    }
  };

  render() {
    const { cartTotal, cartProducts, removeProduct } = this.props;
    const { isLoading } = this.state;

    const products = cartProducts.map(p => {
      return (
        <CartProduct product={p} removeProduct={removeProduct} key={p.id} />
      );
    });

    return (
      <SessionContext.Consumer>
        {({ user }) => {
          return (
              <Drawer isOpen={this.state.isOpen} onClose={this.closeFloatCart}>
                <div className='float-cart'>
                  {!this.state.isOpen && (
                    <span
                      onClick={() => this.openFloatCart()}
                      className="bag bag--float-cart-closed"
                    >
                      <span className="bag__quantity">
                        {cartTotal.productQuantity}
                      </span>
                    </span>
                  )}

                  <div className="float-cart__header">
                    <span className="bag">
                      <span className="bag__quantity">
                        {cartTotal.productQuantity}
                      </span>
                    </span>
                    <span className="header-title">Cart</span>
                  </div>

                  <div className="float-cart__shelf-container">
                    {products}
                    {!products.length && (
                      <p className="shelf-empty">
                        Add some products in the cart <br />
                        :)
                      </p>
                    )}
                  </div>

                  <div className="float-cart__footer">
                    <div className="sub">SUBTOTAL</div>
                    <div className="sub-price">
                      <p className="sub-price__val">
                        {`${cartTotal.totalPrice} pontos`}
                      </p>
                    </div>
                    <div
                      onClick={() => this.proceedToCheckout(user)}
                      className="buy-btn"
                    >
                      {isLoading ? 'Finalizando...' : 'Checkout'}
                    </div>
                    {isLoading && <Spinner />}
                  </div>
                </div>
              </Drawer>
          );
        }}
      </SessionContext.Consumer>
    );
  }
}

const mapStateToProps = state => ({
  cartProducts: state.cart.products,
  newProduct: state.cart.productToAdd,
  productToRemove: state.cart.productToRemove,
  cartTotal: state.total.data
});

export default connect(
  mapStateToProps,
  { loadCart, updateCart, removeProduct, checkoutCart }
)(FloatCart);
