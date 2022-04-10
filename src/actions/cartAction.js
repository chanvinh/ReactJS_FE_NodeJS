import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
  CLEAR_CART_ITEMS,
} from "../constants/cartConstant";
import axios from "axios";

export const addItems = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/medicine/${id}`);

  dispatch({
    type: ADD_TO_CART,
    payload: {
      medicine: data.medicine._id,
      name: data.medicine.name,
      price: data.medicine.price,
      image: data.medicine.images[0].url,
      stock: data.medicine.Stock,
      quantity,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeItems = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const clearItems = () => async (dispatch, getState) => {
  dispatch({
    type: CLEAR_CART_ITEMS,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
