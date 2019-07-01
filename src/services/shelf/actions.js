import { FETCH_PRODUCTS } from './actionTypes';
import firebase from '../../firebase.service';

export const fetchProducts = (filters, sortBy, callback) => async (dispatch) => {
  const productsRef = await firebase.getProducts();
  productsRef.onSnapshot((querySnapshot) => {
    let products = [];
    
    querySnapshot.forEach(snapshot => products.push({...snapshot.data(), id: snapshot.id}));
    
    callback && callback();
    
    dispatch({
      type: FETCH_PRODUCTS,
      payload: products
    });
  })
};
