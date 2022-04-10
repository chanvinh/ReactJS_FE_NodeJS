import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  medicineDetailsReducer,
  medicinesReducer,
  newReviewReducer,
  newMedicineReducer,
  medicineReducer,
  medicineReviewsReducer,
  reviewReducer,
} from "./reducers/medicineReducer";
import { forgotPasswordReducer, profileReducer, userReducer, allUsersReducer, userDetailsReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { myOrdersReducer, newOrderReducer, orderDetailsReducer, allOrdersReducer, orderReducer} from "./reducers/orderReducer";

const reducer = combineReducers({
  medicines: medicinesReducer,
  medicineDetails: medicineDetailsReducer,
  user:userReducer,
  profile: profileReducer,
  forgotPassword:forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  newMedicine: newMedicineReducer,
  medicine: medicineReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  medicineReviews: medicineReviewsReducer,
  review: reviewReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
