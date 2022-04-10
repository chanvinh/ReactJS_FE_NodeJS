import React, { useState, useEffect } from "react";
import Nav from "../Nav";
import "../../scss/NavFull.scss";
import NavTop from "../NavTop";
import avatar from "../../images/avatar.jpg";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminMedicine } from "../../actions/medicineAction";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";

const NavDashBoard = () => {
  const [activeMenu, setActiveMenu] = useState(1);
  const dispatch = useDispatch();

  const { medicines } = useSelector((state) => state.medicines);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  medicines &&
    medicines.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminMedicine());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let total = 0;
  orders &&
    orders.forEach((item) => {
      total += item.totalPrice;
    });

  const lineState = {
    labels: ["Số tiền ban đầu", "Số tiền kiếm được"],
    datasets: [
      {
        label: "Tổng Tiền",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, total],
      },
    ],
  };

  const doughnutState = {
    labels: ["Hết Hàng", "Còn Hàng"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, medicines.length - outOfStock],
      },
    ],
  };

  console.log(medicines);
  return (
    <div class="navFull">
      <Nav
        checkActiveMenu={() => setActiveMenu(activeMenu)}
        activeMenu={activeMenu}
      ></Nav>
      <div class="nav__Left">
        <NavTop nameNav="DashBoards" avatar={avatar}></NavTop>
        <div className="dashboard__full">
          <div className="dashboard__top">
            <div className="dashboard__top-1">
              <p>
                Total Amount <br /> {total}đ
              </p>
            </div>
            <div className="dashboard__top-2">
              <ul>
                <li>
                  <Link to="/admin/medicines">
                    <p>Sản Phẩm</p>
                    <p>({medicines && medicines.length})</p>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/orders">
                    <p>Đơn Hàng</p>
                    <p>({orders && orders.length})</p>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/users">
                    <p>Tài Khoản</p>
                    <p>({users && users.length})</p>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="dashboard__center">
            <Line data={lineState} />
          </div>

          <div className="dashboard__bottom">
            <Doughnut data={doughnutState} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavDashBoard;
