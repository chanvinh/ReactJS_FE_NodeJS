import React, { useState, useEffect, useRef, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import {
  createOrder,
  clearErrors,
} from "../../../../../../actions/orderAction";
import { clearItems } from "../../../../../../actions/cartAction";
const ProductMainOrderRight = (props) => {
  const { clickModalDC } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const payBtn = useRef(null);
  const [formUser, setFormUser] = useState(false);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.newOrder);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: totalPrice,
    totalPrice: totalPrice,
  };

  const submitHandler = (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      dispatch(createOrder(order));
      dispatch(clearItems());
      localStorage.removeItem("shippingInfo");
      navigate("/success");
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      <div class="productMainOrder_Right">
        <form onSubmit={(e) => submitHandler(e)}>
          <div class="nameProductCart_Right">
            <h1>Tổng tiền</h1>
          </div>
          <div class="priceProductCart_Right">
            <div class="priceOld">
              <p>Tạm tính</p>
              <span>{totalPrice} đ</span>
            </div>
            <div class="priceNew">
              <p>
                Thành tiền <span>(Đã bao gồm VAT)</span>
              </p>
              <span>{totalPrice} đ</span>
            </div>
          </div>
          <div class="contentVAT">
            <p>
              *Pharmacity sẽ liên hệ Quý khách sớm nhất trong trường hợp đơn
              hàng không thể giao đến địa điểm theo yêu cầu vì một số khu vực
              hạn chế giao nhận do dịch diễn biến phức tạp.
            </p>
          </div>
          <div class="buyNewProductCart_Right">
            <button type="submit" ref={payBtn} class="buyProduct">
              <p>Đặt Hàng</p>
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default ProductMainOrderRight;
