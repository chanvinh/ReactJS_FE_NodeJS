import React, { Fragment, useState, useEffect } from "react";
import Nav from "../Nav";
import ProductAddType from "../NavProduct/components/ProductAddType";
import ProductType from "../NavProduct/components/ProductType";
import ProductName from "../NavProduct/components/ProductName";
import avatar from "../../images/avatar.jpg";
import NavTop from "../NavTop";
import Container from "../Container";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminMedicine,
  deleteMedicine,
} from "../../actions/medicineAction";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DELETE_PRODUCT_RESET } from "../../constants/medicineConstants";
const ProductList = (props) => {
  const [activeType, setActiveType] = useState(1);
  const [activeMenu, setActiveMenu] = useState(4);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { error, medicines } = useSelector((state) => state.medicines);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.medicine
  );

  const deleteMedicineHandler = (id) => {
    dispatch(deleteMedicine(id));
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
      alert.success("Xoa San Pham Thanh Cong");
      navigate("/admin/medicines");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminMedicine());
  }, [dispatch, alert, error, deleteError, isDeleted, navigate]);

  const columns = [
    { field: "id", headerName: "ID Sản Phẩm", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Tên",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Số Lượng Tồn",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Giá",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "hành động",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/medicine/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteMedicineHandler(params.getValue(params.id, "id"))
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

  medicines &&
    medicines.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <div class="navFull">
      <Nav
        checkActiveMenu={() => setActiveMenu(activeMenu)}
        activeMenu={activeMenu}
      ></Nav>
      <div class="nav__Left">
        <NavTop nameNav="Products" avatar={avatar}></NavTop>
        <div class="nav__Product">
          <Container>
            <div class="row">
              <div class="col-md-12">
                <ProductType
                  ClickActiveType={() => setActiveType(activeType)}
                  activeType={activeType}
                ></ProductType>
                <ProductName nameProduct="Quản lý sản phẩm"></ProductName>
                <ProductAddType
                  nameLink="/admin/medicine"
                  nameTypeAdd="Thêm sản phẩm"
                ></ProductAddType>
                <div class="Product__Table">
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

export default ProductList;
