import React, { useEffect, useState } from "react";
import Container from "../../../Container";
import logo from "../../../../images/logo.png";
import { Link,useNavigate } from "react-router-dom";
import Search from "../Search";
import {useSelector}  from  "react-redux"
const HeaderBody = (props) => {
  const {
    toggleMenuCategory,
    newCart,
    tosts3,
    tosts2,
    tosts1,
    tosts4,
    tosts5,
    tosts6,
  } = props;
  const { cartItems } = useSelector((state) => state.cart);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity *item.price,
    0
  );
  const totalQty = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  return (
    <div class="Header-body">
      <Container>
        <div class="row">
          <div class="col-md-4">
            <div class="Header-body_left">
              <div class="row">
                <div class="col-md-6">
                  <Link to="/medicines">
                    <img src={logo} title={logo}  alt=""/>
                  </Link>
                </div>
                {/* <div class="col-md-5">
                                <div class="Category" onClick={toggleMenuCategory}>
                                    <i class="fa-solid fa-bars"></i>
                                    <p>Danh Mục</p>
                                    <svg class="HeaderPC_chevron-icon__m_CwU" stroke="#112950" width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M10.6673 1.66602L6.00065 6.33268L1.33398 1.66602" stroke="#112950" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                </div>
                            </div> */}
              </div>
            </div>
          </div>
          <div class="col-md-8">
            <div class="Header-body_right">
              <div class="row">
                <div class="col-md-10">
                  <Search />
                </div>
                <div class="col-md-2">
                  <div class="cartCategory">
                    {(cartItems.length >= 1) ? (
                      <div class="thanhtoan">
                        <Link to="/cart">
                          <div class="price">
                            <p>Thanh toán</p>
                            <span>{`${totalPrice}đ`}</span>
                          </div>
                          <i class="fa-solid fa-cart-shopping"></i>
                          <span class="sanpham">{totalQty}</span>
                        </Link>
                      </div>
                    ) : (
                      <p class="giohang">
                        Giỏ hàng
                        <i class="fa-solid fa-cart-shopping"></i>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HeaderBody;
