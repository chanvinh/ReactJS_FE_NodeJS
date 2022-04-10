import React from "react";

const ProductMainOrderLeftBody = (props) => {
  const { clickModalDN, clickModalDiaChi } = props;
  console.log();
  return (
    <div class="productMainOrder_Left_Body">
      {localStorage.getItem("shippingInfo") ? (
        <>
          <div class="nameOrder_Left_Body">
            <h1>2</h1>
            <h2>Thông tin giao hàng</h2>
            <button onClick={clickModalDiaChi}>
              Thay đổi địa chỉ nhận hàng
            </button>
          </div>
          <div class="view__order">
            <div class="order__info">
              <p>
                Số điện thoại:{" "}
                <span>
                  {JSON.parse(localStorage.getItem("shippingInfo")).phoneNumber}
                </span>
              </p>
              <p>
                Địa chỉ:{" "}
                <span>
                  {JSON.parse(localStorage.getItem("shippingInfo")).address}
                </span>
              </p>
              <p>
                Thành phố:{" "}
                <span>
                  {JSON.parse(localStorage.getItem("shippingInfo")).city}
                </span>
              </p>
              <p>
                Quốc gia:{" "}
                <span>
                  {JSON.parse(localStorage.getItem("shippingInfo")).country}
                </span>
              </p>
              <p>
                Trạng thái:{" "}
                <span>
                  {JSON.parse(localStorage.getItem("shippingInfo")).state}
                </span>
              </p>
            </div>
            <div class="edit__info">
              <p>Chỉnh sửa thông tin cá nhân</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div class="nameOrder_Left_Body">
            <h1>2</h1>
            <h2>Thông tin giao hàng</h2>
          </div>
          <div class="buttonModal_Left_Body">
            <p class="diachi" onClick={clickModalDiaChi}>
              Nhập địa chỉ nhận hàng
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductMainOrderLeftBody;
