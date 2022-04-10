import React, { Fragment, useState } from "react";
import "../../scss/MainCart.scss";
import ListMainCart from "./components/ListMainCart";
import ModalCartDelete from "./components/ModalCartDelete";
import Container from "../Container";
import ProductMainCartLeft from "./components/ProductMainCartLeft";
import ProductMainCartRight from "./components/ProductMainCartRight";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addItems, removeItems } from "../../actions/cartAction";
import { Typography } from "@mui/material";
import { useAlert } from "react-alert";

const MainCart = () => {
  const [toggleModal, setToggleModal] = useState(false);
  const navigate = useNavigate();
  const [togglePolicy, setTogglePolicy] = useState(false);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.user);

  const buttonNext = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItems(id, newQty));
  };

  const buttonPrev = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItems(id, newQty));
  };

  const deleteItems = (id) => {
    dispatch(removeItems(id));
  };
  const alert = useAlert();
  const checkout = () => {
    if (isAuthenticated) {
      navigate("/shipping");
    }
    if (isAuthenticated === false) {
      navigate("/medicines");
      alert.error("Can phai dang nhap de dat hang");
    }
  };

  return (
    <div class="mainCart">
      <ListMainCart></ListMainCart>
      <Fragment>
        {cartItems.length === 0 ? (
          <div>
            <Typography>Không có sản phẩm</Typography>
            <Link to="/medicines">Quay lại</Link>
          </div>
        ) : (
          <Fragment>
            <div class="productCart">
              <Container>
                <div class="row">
                  <div class="col-md-8">
                    <div class="productCart_Left">
                      <div class="nameCart_Left">
                        <h1>Giỏ hàng</h1>
                        {/* <span>Xóa tất cả giỏ hàng</span> */}
                      </div>
                      <div class="shipCart_Left">
                        <div class="freeship_check">
                          <div class="freeship_position">
                            <span>&nbsp;</span>
                          </div>
                          <div class="freeship_svg">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              stroke="#5DAC46"
                              stroke-width="2"
                            >
                              <path
                                d="M3.33301 10L8.33301 15L16.6663 5"
                                stroke="inherit"
                                stroke-width="inherit"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>
                            </svg>
                          </div>
                        </div>
                        <div class="freeship_free">
                          <p>Bạn đã được miễn phí vận chuyển.</p>
                        </div>
                        <div class="freeship_policy">
                          <p>
                            Chính sách giao hàng{" "}
                            <span
                              onClick={() => setTogglePolicy(!togglePolicy)}
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="#C2C2C2"
                              >
                                <path
                                  d="M16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8ZM5.496 6.033H6.321C6.459 6.033 6.569 5.92 6.587 5.783C6.677 5.127 7.127 4.649 7.929 4.649C8.615 4.649 9.243 4.992 9.243 5.817C9.243 6.452 8.869 6.744 8.278 7.188C7.605 7.677 7.072 8.248 7.11 9.175L7.113 9.392C7.11405 9.45761 7.14085 9.52017 7.18762 9.5662C7.23439 9.61222 7.29738 9.63801 7.363 9.638H8.174C8.2403 9.638 8.30389 9.61166 8.35078 9.56478C8.39766 9.51789 8.424 9.4543 8.424 9.388V9.283C8.424 8.565 8.697 8.356 9.434 7.797C10.043 7.334 10.678 6.82 10.678 5.741C10.678 4.23 9.402 3.5 8.005 3.5C6.738 3.5 5.35 4.09 5.255 5.786C5.25363 5.81829 5.25888 5.85053 5.27043 5.88072C5.28198 5.91091 5.29958 5.93841 5.32216 5.96155C5.34473 5.98468 5.3718 6.00296 5.40169 6.01524C5.43159 6.02753 5.46368 6.03357 5.496 6.033ZM7.821 12.476C8.431 12.476 8.85 12.082 8.85 11.549C8.85 10.997 8.43 10.609 7.821 10.609C7.237 10.609 6.812 10.997 6.812 11.549C6.812 12.082 7.237 12.476 7.822 12.476H7.821Z"
                                  fill="inherit"
                                ></path>
                              </svg>
                            </span>
                          </p>
                          {togglePolicy ? (
                            <div class="toggle_policy">
                              <div class="top_policy">
                                <h1>Chính sách giao hàng</h1>
                                <i
                                  onClick={() => setTogglePolicy(false)}
                                  class="fa-solid fa-xmark"
                                ></i>
                              </div>
                              <div class="bottom_policy">
                                <ul>
                                  <li>
                                    Pharmacity giao hàng miễn phí cho đơn hàng
                                    có giá trị từ 300.000 VNĐ trở lên.
                                  </li>
                                </ul>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>
                      {cartItems &&
                        cartItems.map((item) => (
                          <ProductMainCartLeft
                            item={item}
                            deleteItems={deleteItems}
                            buttonNext={buttonNext}
                            buttonPrev={buttonPrev}
                          />
                        ))}
                    </div>
                  </div>
                  <div class="col-md-4">
                    <ProductMainCartRight
                      checkout={checkout}
                    ></ProductMainCartRight>
                  </div>
                </div>
              </Container>
            </div>
          </Fragment>
        )}
      </Fragment>
    </div>
  );
};

export default MainCart;
