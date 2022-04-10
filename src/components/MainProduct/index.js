import React from "react";
import "../../scss/MainProduct.scss";

import SectionNav from "./components/SectionNav";
import SectionMedicine from "./components/SectionMedicine";

const MainProduct = (props) => {
  const { addCart3, addcart2, addCart1, addCartNow } = props;
  return (
    <div class="mainProduct">
      <SectionNav></SectionNav>
      <SectionMedicine
        addCart1={addCart1}
        addCartNow={addCartNow}
        addCart3={addCart3}
        addcart2= {addcart2}
      />
    </div>
  );
};

export default MainProduct;
