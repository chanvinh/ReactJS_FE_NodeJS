import React, { Fragment, useEffect, useState } from "react";
import Nav from "../Nav";
import "../../scss/NavFull.scss";
import NavTop from "../NavTop/index";
import avatar from "../../images/avatar.jpg";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAllReviews,
  deleteReviews,
} from "../../actions/medicineAction";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Star from "@mui/icons-material/Star";
import { DELETE_REVIEW_RESET } from "../../constants/medicineConstants";
import { useNavigate } from "react-router-dom";
import Container from "../Container";

const MedicineReviews = () => {
  const [activeMenu, setActiveMenu] = useState(5);
  const dispatch = useDispatch();

  const alert = useAlert();
  const navigate = useNavigate();
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );

  const { error, reviews, loading } = useSelector(
    (state) => state.medicineReviews
  );

  const [medicineId, setMedicineId] = useState("");

  const deleteReview = (reviewId) => {
    dispatch(deleteReviews(reviewId, medicineId));
  };

  const productReviewsSubmit = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(medicineId));
  };

  useEffect(() => {
    if (medicineId.length === 24) {
      dispatch(getAllReviews(medicineId));
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Da xoa Danh gia thanh cong");
      navigate("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, alert, error, deleteError, navigate, isDeleted, medicineId]);

  const columns = [
    { field: "id", headerName: "ID Danh gia", minWidth: 200, flex: 0.5 },

    {
      field: "user",
      headerName: "Khach Hang",
      minWidth: 200,
      flex: 0.6,
    },

    {
      field: "comment",
      headerName: "Binh luan",
      minWidth: 350,
      flex: 1,
    },

    {
      field: "rating",
      headerName: "Danh Gia",
      type: "number",
      minWidth: 180,
      flex: 0.4,

      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Hanh dong",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button
              onClick={() => deleteReview(params.getValue(params.id, "id"))}
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });
  return (
    <div class="navFull">
      <Nav
        checkActiveMenu={() => setActiveMenu(activeMenu)}
        activeMenu={activeMenu}
      ></Nav>
      <div class="nav__Left">
        <NavTop nameNav="Table Lists" avatar={avatar}></NavTop>
        <div className="medicines__reivews">
          <Container>
            <Fragment>
              <div className="">
                <div className="">
                  <form className="" onSubmit={productReviewsSubmit}>
                    <h1 className="">Tat ca Danh Gia</h1>

                    <div>
                      <Star />
                      <input
                        type="text"
                        placeholder="ID Duoc Pham"
                        required
                        value={medicineId}
                        onChange={(e) => setMedicineId(e.target.value)}
                      />
                    </div>

                    <Button
                      id=""
                      type="submit"
                      disabled={
                        loading
                          ? true
                          : false || medicineId === ""
                          ? true
                          : false
                      }
                    >
                      Tim kiem
                    </Button>
                  </form>

                  {reviews && reviews.length > 0 ? (
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      pageSize={10}
                      disableSelectionOnClick
                      className=""
                      autoHeight
                    />
                  ) : (
                    <h1 className="">Khong co danh gia nao</h1>
                  )}
                </div>
              </div>
            </Fragment>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default MedicineReviews;
