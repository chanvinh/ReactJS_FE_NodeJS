import React, { useState } from "react";
import ModalCartDelete from "../ModalCartDelete";
import { Link } from "react-router-dom";

const ProductMainCartLeft = ({ item, deleteItems, buttonNext, buttonPrev }) => {
  const [togglePolicy, setTogglePolicy] = useState(false);

  const [itemDelete, setItemDelete] = useState(false);

  const toggleItemDelete = () => {
    setItemDelete(true);
  };

  return (
    <>
      <div class="itemCart_Left">
        <div class="row">
          <div class="col-md-6">
            <div class="nameItemCart_Left">
              <Link to={`/medicine/${item.medicine}`}>
                <div class="imageItemCart_Left">
                  <img src={item.image} alt=""></img>
                </div>
              </Link>
              <h1>{item.name}</h1>
            </div>
          </div>
          <div class="col-md-2">
            <div class="buttonItemCart_Left">
              <button onClick={() => buttonPrev(item.medicine, item.quantity)}>
                -
              </button>
              <input type="number" readOnly value={item.quantity}></input>
              <button
                onClick={() =>
                  buttonNext(item.medicine, item.quantity, item.stock)
                }
              >
                +
              </button>
            </div>
          </div>
          <div class="col-md-3">
            <div class="priceItemCart_Left">
              <p>{`${item.price * item.quantity} đ`}</p>
            </div>
          </div>
          <div class="col-md-1">
            <div class="closeItemCart_Left">
              <span onClick={() => deleteItems(item.medicine)}>
                <i class="fa-solid fa-xmark"></i>
                Xóa
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductMainCartLeft;
