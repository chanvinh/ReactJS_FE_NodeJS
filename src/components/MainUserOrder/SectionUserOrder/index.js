import React, { useState, useEffect, Fragment } from "react";
import ListOrderTab from "../../Configs/ListOrderTab";
import content from "../../../images/content_thuonghieu.png";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import LaunchIcon from "@mui/icons-material/Launch";
import { clearErrors, myOrders } from "../../../actions/orderAction";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import Loader from "../../layout/Loader/Loader";
const SectionUserOrder = () => {
  const [activeButton, setActiveButton] = useState(1);

  const dispatch = useDispatch();

  const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 200, flex: 1 },

    {
      field: "status",
      headerName: "trang thai",
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
      headerName: "Tong so",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "So luong",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Hanh Dong",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/me/orders/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  console.log(!orders);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, alert, error]);

  return (
    <div class="sectionUserOrder">
      <div class="nameSection__User">
        <h1>Lịch sử giao dịch</h1>
      </div>
      <div class="listUser__Order">
        <div class="listUser__Order__Content">
          <div class="result__Content">
            <Fragment>
              {loading ? (
                <Loader />
              ) : (
                <Fragment>
                  {orders.length === 0 ? (
                    <div>
                      <img src={content} alt=""></img>
                      <p>Bạn chưa có đơn hàng nào rồi!</p>
                    </div>
                  ) : (
                    <div className="myOrdersPage">
                      <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={100}
                        disableSelectionOnClick
                        className="myOrdersTable"
                        autoHeight
                      />
                    </div>
                  )}
                </Fragment>
              )}
            </Fragment>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionUserOrder;
