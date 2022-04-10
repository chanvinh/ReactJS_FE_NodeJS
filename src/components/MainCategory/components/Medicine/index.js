import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const Medicine = ({ medicine }, props) => {
  const { addCart4 } = props;
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: medicine.ratings,
    isHalf: true,
  };
  return (
    <div class="ItemCategory">
      <Link to={`/medicine/${medicine._id}`}>
        {/* {medicine.Stock > 0 ? (
          <div class="discountPos">
            <p>{`${medicine.Stock} sl`}</p>
          </div>
        ) : null} */}
        <div class="imageItemCategory">
          <img src={medicine.images[0].url} alt=""></img>
        </div>
        <div class="nameItemCategory">
          <h1>{medicine.name}</h1>
        </div>
        <div class="priceItemCategory">
          <div class="start__number">
            <ReactStars {...options} />
            <span>({medicine.numOfReviews}) </span>
          </div>
          <div class="price__discount">
            <p>{`${medicine.price} đ`}</p>
            <span>{`Số lượng tồn ${medicine.Stock} `}</span>
          </div>
        </div>
        <div class="cartItemCategory">
          <button onClick={addCart4}>Thêm vào giỏ hàng</button>
        </div>
      </Link>
    </div>
  );
};

export default Medicine;
