import React, { useState, Fragment, useEffect } from "react";
import Nav from "../Nav";
import "../../scss/NavFull.scss";
import NavTop from "../NavTop";
import avatar from "../../images/avatar.jpg";
import Container from "../Container";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  deleteOrder,
  getAllOrders,
  clearErrors,
} from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";
import { Link, useNavigate } from "react-router-dom";

const NavOrder = () => {
  const [activeMenu, setActiveMenu] = useState(3);

  const dispatch = useDispatch();

  const alert = useAlert();

  const navigate = useNavigate();

  const { error, orders } = useSelector((state) => state.allOrders);

  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Don hang xoa thanh cong");
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, alert, error, deleteError, isDeleted, navigate]);

  const columns = [
    { field: "id", headerName: "ID Don Hang", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Trang Thai Don Hang",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "So luong don hang",
      type: "number",
      minWidth: 150,
      flex: 0.4,
    },

    {
      field: "amount",
      headerName: "Gia tien don hang",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Hang dong",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div class="navFull">
      <Nav
        checkActiveMenu={() => setActiveMenu(activeMenu)}
        activeMenu={activeMenu}
      ></Nav>
      <div class="nav__Left">
        <NavTop nameNav="Orders" avatar={avatar}></NavTop>
        <div class="nav__Order">
          <Container>
            <div class="row">
              <div class="col-md-12">
                <div class="Order__Name">
                  <h1>Danh sách đơn đặt hàng vừa nhận</h1>
                </div>
                <div class="Order__Table">
                  <Fragment>
                    <div className="">
                      <div className="">
                        <DataGrid
                          rows={rows}
                          columns={columns}
                          pageSize={10}
                          disableSelectionOnClick
                          className=""
                          autoHeight
                        />
                      </div>
                    </div>
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

export default NavOrder;
