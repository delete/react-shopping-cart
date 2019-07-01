import firebase from '../../firebase.service';

import { LOAD_CART, ADD_PRODUCT, REMOVE_PRODUCT, CLEAN_CART } from './actionTypes';
import * as totalActionsTypes from '../total/actionTypes'
import { toast } from 'react-toastify';

export const loadCart = products => ({
  type: LOAD_CART,
  payload: products
});

export const addProduct = product => ({
  type: ADD_PRODUCT,
  payload: product
});

export const removeProduct = product => ({
  type: REMOVE_PRODUCT,
  payload: product
});

export const cleanCart = () => ({
  type: CLEAN_CART,
});


export const checkoutCart = (products, user, total, callback) => async (dispatch) => {
  if(user.points < total ) {
    toast.warn('Você não possui pontos o suficiente. :(');
    callback && callback()
    return;
  }
  const productsRef = await Promise.all(products.map(product => firebase.getProduct(product.id)))

  try {
    const paymentRef = await firebase.createPayment({
      productsRef,
      user: user.docRef,
      total,
      date: new Date(),
    });
    
    await firebase.createTransaction({
      payment: paymentRef,
      type: 'purchase',
      user: user.docRef,
      date: new Date(),
    });

    await user.docRef.update({points: user.points - total});

    dispatch({ type: CLEAN_CART });
    dispatch({ type: totalActionsTypes.CLEAN_CART });
    toast.success('Sua troca foi finalizada. Aproveite! :D');
  } catch (err) {
    console.log(err);
  }
  callback && callback()
}