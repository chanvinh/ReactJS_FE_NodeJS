import React, { Fragment } from "react";
import Rating from "@mui/material/Rating";
import { useSelector } from "react-redux";
import Loader from "../../../../../layout/Loader/Loader";
import Profile from "../../../../../../images/Profile.png";
const Comment = ({ review }) => {
  const { loading, user } = useSelector((state) => state.user);

  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div class="user__comment">
            <div class="avatar__user">
              <img src={Profile} alt=""></img>
            </div>
            <div class="content__user">
              <div class="star__user">
                <Rating {...options} />
              </div>
              <div class="name__user">
                <h2>{review.name}</h2>
                {/* <span>17:27, 29/03/2022</span> */}
              </div>
              {/* {buyProduct ? (
            <div class="buy__user">
              <span>Đã mua sản phẩm này</span>
            </div>
          ) : null} */}
              <div class="comment__user">
                <p>{review.comment}</p>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Comment;
