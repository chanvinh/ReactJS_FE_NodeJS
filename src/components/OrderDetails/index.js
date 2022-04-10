import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import "../../scss/OrderDeital.scss";
import Container from "../Container/index";

const OrderDetails = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="orderDeital__user">
            <Container>
              <div class="row">
                <div className="col-md-6">
                  <Typography component="h1">
                    Order #{order && order._id}
                  </Typography>
                  <Typography>Chi tiet Don Hang</Typography>
                  <div className="child">
                    <div>
                      <p>Ten:</p>
                      <span>{order.user && order.user.name}</span>
                    </div>
                    <div>
                      <p>So dien Thoai:</p>
                      <span>
                        {order.shippingInfo && order.shippingInfo.phoneNumber}
                      </span>
                    </div>
                    <div>
                      <p>Dia chi:</p>
                      <span>
                        {order.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.country}`}
                      </span>
                    </div>
                  </div>
                  <Typography>Payment</Typography>
                  <div className="child">
                    <div>
                      <p>Amount:</p>
                      <span>{order.totalPrice && order.totalPrice}</span>
                    </div>
                  </div>

                  <Typography>Trang Thai Don Hang</Typography>
                  <div className="child">
                    <p
                      className={
                        order.orderStatus && order.orderStatus === "Delivered"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      {order.orderStatus && order.orderStatus}
                    </p>
                  </div>
                </div>

                <div className="col-md-6">
                  <Typography>San Pham Dat Hang</Typography>
                  <div className="child">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.product}>
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
            </Container>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
