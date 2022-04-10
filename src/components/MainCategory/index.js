import React from "react";
import { useLocation } from "react-router-dom";
import "../../scss/MainCategory.scss";
import Container from "../Container";
import ContentCategory from "./components/ContentCategory";
import NameMainCategory from "./components/NameMainCategory";
const MainCategory = (props) => {
  const { addCart4 } = props;
  return (
          <div class="mainCategory">
            {/* <ListMainCategory name="Thực phẩm dinh dưỡng"></ListMainCategory> */}
            <NameMainCategory name="Thực phẩm dinh dưỡng"></NameMainCategory>
            <div class="contentCategory">
              <Container>
                <ContentCategory addCart4={addCart4}/>
              </Container>
            </div>
          </div>
  );
};

export default MainCategory;
