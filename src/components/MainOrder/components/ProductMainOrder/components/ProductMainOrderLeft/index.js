import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingInfo } from "../../../../../../actions/cartAction";
import Modal from "../../../../../Modal";
import ModalMobline from "../../../../../ModalMobile";
import ModalMainOrder from "../../../ModalMainOrder";
import ProductMainOrderLeftBody from "./components/ProductMainOrderLeftBody";
import ProductMainOrderLeftBottom from "./components/ProductMainOrderLeftBottom";
import ProductMainOrderLeftTop from "./components/ProductMainOrderLeftTop";

const ProductMainOrderLeft = (props) => {
  const [toggleModalDN, setToggleModalDN] = useState(false);
  const ModalFlow = () => {
    setToggleModalDN(true);
    if (window.innerWidth > 1200) {
      document.querySelector("body").style = "overflow:hidden";
    }
  };
  const closeXModal = () => {
    setToggleModalDN(false);
    document.querySelector("body").style = null;
  };

  const [clickModalOrder, setClickModalOrder] = useState(false);
  const closeXModalOrder = () => {
    setClickModalOrder(false);
    document.body.style = null;
  };

  const ModalDCFlow = () => {
    setClickModalOrder(true);
    document.body.style = "overflow:hidden";
  };

  function clickXN() {
    document.body.style = null;
    setClickModalOrder(false);
  }

  return (
    <div class="productMainOrderLeft">
      <ProductMainOrderLeftTop></ProductMainOrderLeftTop>
      <ProductMainOrderLeftBody
        clickModalDN={ModalFlow}
        clickModalDiaChi={ModalDCFlow}
      ></ProductMainOrderLeftBody>
      <ProductMainOrderLeftBottom></ProductMainOrderLeftBottom>
      {toggleModalDN && window.innerWidth > 1200 ? (
        <Modal toggleCloseUser={closeXModal}></Modal>
      ) : null}
      {toggleModalDN && window.innerWidth <= 1200 ? (
        <ModalMobline></ModalMobline>
      ) : null}
      {clickModalOrder ? (
        <ModalMainOrder
          clickXN={clickXN}
          closeXModalDC={closeXModalOrder}
        ></ModalMainOrder>
      ) : null}
    </div>
  );
};

export default ProductMainOrderLeft;
