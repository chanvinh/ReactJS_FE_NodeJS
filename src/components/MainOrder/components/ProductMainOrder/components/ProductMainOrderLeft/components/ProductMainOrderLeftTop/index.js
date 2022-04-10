import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductMainOrderLeftTop = () => {
  const { cartItems } = useSelector((state) => state.cart);

  const navigate = useNavigate();
  const [clickFullHeighOrder, setClickFullHeighOrder] = useState(false);
  const toggleClickFullHeighOder = () => {
    if (!clickFullHeighOrder) {
      document
        .querySelector(".itemOrder_Left_Top")
        .classList.add("activeFullHeighOder");
      setClickFullHeighOrder(true);
    } else {
      document
        .querySelector(".itemOrder_Left_Top")
        .classList.remove("activeFullHeighOder");
      setClickFullHeighOrder(false);
    }
  };

  const [itemdelete, setItemDelete] = useState(false);

  return (
    <div class="productMainOrder_Left_Top">
      <div class="nameOrder_Left_Top">
        <h1>San Pham Cua Ban</h1>
      </div>
      <div class="nameChilderOder_Left_Top">
        <h1>1</h1>
        <h2>
          Giỏ hàng{" "}
          <span>{`${cartItems.length} - ${cartItems.reduce(
            (sum, item) => sum + item.quantity * item.price,
            0
          )} đ`}</span>
        </h2>
        <Link to="/cart">Nhấn để thay đổi</Link>
      </div>
      <div class="itemOrder_Left_Top">
        {cartItems &&
          cartItems.map((item) => (
            <div class="row" key={item.medicine}>
              <Link to={`/medicines/${item.medicine}`} class="col-md-2">
                <div class="imageItemCart_Left">
                  <img src={item.image} alt={item.name}></img>
                </div>
              </Link>
              <div class="col-md-5">
                <div class="nameItemCart_Left">
                  <h1>{item.name}</h1>
                </div>
              </div>
              <div class="col-md-2">
                <div class="buttonItemCart_Left">
                  {item.quantity} X {item.price}đ ={" "}
                </div>
              </div>
              <div class="col-md-3">
                <div class="priceItemCart_Left">
                  <p>{item.price * item.quantity}đ</p>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div class="buttonOrder_Left_Top">
        {clickFullHeighOrder ? (
          <span onClick={toggleClickFullHeighOder}>
            Xem tất cả{" "}
            <svg
              width="24"
              style={{ transform: "rotate(90deg)" }}
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0f62f9"
            >
              <path
                d="M8.5 5L15.5 12L8.5 19"
                stroke="inherit"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </span>
        ) : (
          <span onClick={toggleClickFullHeighOder}>
            Thu gọn{" "}
            <svg
              width="24"
              style={{ transform: "rotate(-90deg)" }}
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0f62f9"
            >
              <path
                d="M8.5 5L15.5 12L8.5 19"
                stroke="inherit"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductMainOrderLeftTop;
