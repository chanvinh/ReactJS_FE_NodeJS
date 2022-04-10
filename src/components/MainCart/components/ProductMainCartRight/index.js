import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const ProductMainCartRight = ({checkout}) => {
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <div class="productCart_Right">
      <div class="nameProductCart_Right">
        <h1>Tổng tiền</h1>
      </div>
      <div class="priceProductCart_Right">
        <p>Tạm tính</p>
        <span>{`${cartItems.reduce(
          (sum, item) => sum + item.quantity * item.price,
          0
        )} đ`}</span>
      </div>
      <div class="buyNewProductCart_Right">
        <Link to="/medicines" class="buyNew">
          Mua thêm
        </Link>

        <p onClick={checkout} class="buyProduct">
          <p>Đặt hàng</p>
          <span>Giao tận nơi hoặc nhận tại nhà thuốc</span>
        </p>
      </div>
    </div>
  );
};

export default ProductMainCartRight;
