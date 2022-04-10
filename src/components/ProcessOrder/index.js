import React, { Fragment, useState, useEffect } from "react";
import Container from "../Container";
import Nav from "../Nav";
import ProductAddType from "../NavProduct/components/ProductAddType";
import ProductName from "../NavProduct/components/ProductName";
import ProductType from "../NavProduct/components/ProductType";
import avatar from "../../images/avatar.jpg";
import NavTop from "../NavTop";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";

const ProcessOrder = () => {
  const [activeType, setActiveType] = useState(2);
  const [activeMenu, setActiveMenu] = useState(3);

  const [status, setStatus] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();
  const alert = useAlert();

  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const updateOrderSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(id, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Update Don Hang Thanh Cong");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id, isUpdated, updateError]);

  return (
    <div class="navFull">
      <Nav
        checkActiveMenu={() => setActiveMenu(activeMenu)}
        activeMenu={activeMenu}
      ></Nav>
      <div class="nav__Left">
        <NavTop nameNav="Products" avatar={avatar} />
        <div class="nav__Product">
          <Container>
            <div class="row">
              <div class="col-md-12">
                <ProductName nameProduct="Xem chi tiết đơn hàng"></ProductName>
                <div class="Edit__Prodcut">
                  <Fragment>
                    {loading ? (
                      <Loader />
                    ) : (
                      <>
                        <div class="Edit__left">
                          <div className="">
                            <Typography>Thong Tin Chuyen Hang</Typography>
                            <div className="child">
                              <div>
                                <p>Ten:</p>
                                <span>{order.user && order.user.name}</span>
                              </div>
                              <div>
                                <p>So Dien Thoai:</p>
                                <span>
                                  {order.shippingInfo &&
                                    order.shippingInfo.phoneNumber}
                                </span>
                              </div>
                              <div>
                                <p>Address:</p>
                                <span>
                                  {order.shippingInfo &&
                                    `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.country}`}
                                </span>
                              </div>
                            </div>

                            <Typography>Gia Tien Tong</Typography>
                            <div className="child">
                              <div>
                                <p>Giá tiền:</p>
                                <span>
                                  {order.totalPrice && order.totalPrice}
                                </span>
                              </div>
                            </div>

                            <Typography>Trang Thai Don Hang</Typography>
                            <div className="child">
                              <div>
                                <p
                                  className={
                                    order.orderStatus &&
                                    order.orderStatus === "Delivered"
                                      ? "blueColor"
                                      : "redColor"
                                  }
                                >
                                  {order.orderStatus && order.orderStatus}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="">
                            <Typography>San Pham trong Gio Hang</Typography>
                            <div className="child">
                              {order.orderItems &&
                                order.orderItems.map((item) => (
                                  <div key={item.medicine}>
                                    <img src={item.image} alt={item.name} />
                                    <Link to={`/medicine/${item.medicine}`}>
                                      {item.name}
                                    </Link>{" "}
                                    <span>
                                      {item.quantity} X {item.price}đ ={" "}
                                      <b>{item.price * item.quantity}đ</b>
                                    </span>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                        <div
                          className="Edit__right"
                          style={{
                            display:
                              order.orderStatus === "Delivered"
                                ? "none"
                                : "inline-block",
                          }}
                        >
                          <form className="" onSubmit={updateOrderSubmit}>
                            <h1>Xu Ly Don Hang</h1>

                            <div>
                              <AccountTreeIcon />
                              <select
                                onChange={(e) => setStatus(e.target.value)}
                              >
                                <option value="">Choose Category</option>
                                {order.orderStatus === "Processing" && (
                                  <option value="Shipped">Shipped</option>
                                )}

                                {order.orderStatus === "Shipped" && (
                                  <option value="Delivered">Delivered</option>
                                )}
                              </select>
                            </div>

                            <Button
                              id=""
                              type="submit"
                              disabled={
                                loading
                                  ? true
                                  : false || status === ""
                                  ? true
                                  : false
                              }
                            >
                              Xy Ly
                            </Button>
                          </form>
                        </div>
                      </>
                    )}
                  </Fragment>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default ProcessOrder;
