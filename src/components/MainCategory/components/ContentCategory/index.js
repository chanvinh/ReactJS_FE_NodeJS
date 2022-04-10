import React, { Fragment, useEffect, useState } from "react";
import banner1 from "../../../../images/banner1.webp";
import banner2 from "../../../../images/banner2.webp";
import banner3 from "../../../../images/banner3.webp";
import banner4 from "../../../../images/banner4.webp";
import Slider from "react-slick";
import { clearErrors, getMedicine } from "../../../../actions/medicineAction";
import { useSelector, useDispatch } from "react-redux";
import Medicine from "../Medicine";
import Loader from "../../../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Typography from "@mui/material/Typography";
import Slider1 from "@mui/material/Slider";

const categories = ["Laptop"];

const ContentCategory = (props) => {
  const { addCart4 } = props;
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 2500000]);
  const [category, setCategory] = useState("");

  const [ratings, setRatings] = useState(0);
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  const alert = useAlert();
  const {
    loading,
    error,
    medicines,
    medicinesCount,
    resultPerPage,
    filteredMedicinesCount,
  } = useSelector((state) => state.medicines);

  const { keyword } = useParams();

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  let count = filteredMedicinesCount;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getMedicine(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);

  const options = {
    currentPage,
    resultPerPage,
    medicinesCount,
  };
  console.log(options);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div class="row">
            <div class="col-md-3">
              <div class="contentCategory__Left">
                <div className="filterBox">
                  <Typography>Giá</Typography>
                  <Slider1
                    value={price}
                    onChange={priceHandler}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    min={0}
                    max={2500000}
                  />
                  <h1 class="nameContent__Left">Danh mục</h1>
                  <div class="productContent__Left">
                    <ul>
                      {categories.map((category) => (
                        <li
                          key={category}
                          onClick={() => setCategory(category)}
                        >
                          {category}
                        </li>
                      ))}
                    </ul>

                    <fieldset>
                      <Typography component="legend">
                        Xếp hạng đánh giá
                      </Typography>
                      <Slider1
                        value={ratings}
                        onChange={(e, newRating) => {
                          setRatings(newRating);
                        }}
                        aria-labelledby="continuous-slider"
                        valueLabelDisplay="auto"
                        min={0}
                        max={5}
                      />
                    </fieldset>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-9">
              <div class="contentCategory__Right">
                <div class="bannerCategory">
                  <Slider {...settings}>
                    <img src={banner1} title={banner1} alt="" />
                    <img src={banner2} title={banner2} alt="" />
                    <img src={banner3} title={banner3} alt="" />
                    <img src={banner4} title={banner1} alt="" />
                  </Slider>
                </div>
                <div class="mainProductCategory">
                  {medicines &&
                    medicines.map((medicine) => (
                      <Medicine
                        key={medicine._id}
                        medicine={medicine}
                        addCart4={addCart4}
                      />
                    ))}
                </div>
                {resultPerPage <= count && (
                  <div class="paginationCategory">
                    <Pagination
                      activePage={currentPage}
                      itemsCountPerPage={resultPerPage}
                      totalItemsCount={medicinesCount}
                      onChange={setCurrentPageNo}
                      nextPageText="Next"
                      prevPageText="Prev"
                      firstPageText="1st"
                      lastPageText="Last"
                      itemClass="page-item"
                      linkClass="page-link"
                      activeClass="ActiveListPagination"
                      activeLinkClass="pageLinkActive"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ContentCategory;
