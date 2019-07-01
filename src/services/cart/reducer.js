import { LOAD_CART, ADD_PRODUCT, REMOVE_PRODUCT, CLEAN_CART } from './actionTypes';

const initialState = {
  products: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_CART:
      return {
        ...state,
        products: action.payload
      };
    case ADD_PRODUCT:
      return {
        ...state,
        productToAdd: Object.assign({}, action.payload)
      };
    case REMOVE_PRODUCT:
      return {
        ...state,
        productToRemove: Object.assign({}, action.payload)
      };

    case CLEAN_CART:
      return {
        ...state,
        products: []
      };
    default:
      return state;
  }
}
