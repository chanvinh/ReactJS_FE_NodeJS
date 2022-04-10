import React, { useState } from "react";
import Nav from "../Nav";
import NavTop from "../NavTop";
import avatar from "../../images/avatar.jpg";
import Container from "../Container";
import ProductType from "../NavProduct/components/ProductType";
import ProductName from "../NavProduct/components/ProductName";
import ProductAddType from "../NavProduct/components/ProductAddType";

const NavProductType2Update = (props) => {

  const [activeType, setActiveType] = useState(2);
  const [activeMenu, setActiveMenu] = useState(5);


  return (
    <div class="navFull">
      <Nav
        checkActiveMenu={() => setActiveMenu(activeMenu)}
        activeMenu={activeMenu}
      ></Nav>
      <div class="nav__Left">
        <NavTop nameNav="Products" avatar={avatar}/>
        <div class="nav__Product">
          <Container>
            <div class="row">
              <div class="col-md-12">
                <ProductType
                  ClickActiveType={() => setActiveType(activeType)}
                  activeType={activeType}
                ></ProductType>
                <ProductName nameProduct="Quản lý sản phẩm"></ProductName>
                <ProductAddType
                  nameLink="/product/type2/add"
                  nameTypeAdd="Thêm sản phẩm"
                ></ProductAddType>
                <div class="Product__Type1__Add">
                  <div class="Product__Type1__Add__Left">
                    <div class="Children__Type1">
                      <label>Tên hãng sản phẩm</label>
                      <input
                        defaultValue={""}
                        onChange={(e) => ("")}
                        type="text"
                        placeholder="Nhập tên hãng sản phẩm"
                        required
                      ></input>
                    </div>
                    <div class="Children__Type1">
                      <label>Nội dung mô tả hãng sản phẩm</label>
                      <textarea
                        defaultValue={""}
                        cols="80"
                        onChange={(e) => ("")}
                        row="4"
                        placeholder="Nhập mô tả sản phẩm"
                      ></textarea>
                    </div>
                    <div class="Children__Type1">
                      <label>Hãng cha sản xuất</label>
                      <input
                        defaultValue={""}
                        onChange={(e) => ("")}
                        type="text"
                        placeholder="Nhập hãng sản xuất"
                        required
                      ></input>
                    </div>
                  </div>
                  <div class="Product__Type1__Add__Right">
                    <div class="logo512">
                      <img src={""} alt=""></img>
                    </div>
                    <input
                      defaultValue={""}
                      onChange={(e) => ("")}
                      id="file"
                      type="file"
                      style={{ display: "none" }}
                      required
                    ></input>
                    <span onClick={""}>
                      <i class="fa-solid fa-cloud-arrow-up"></i>
                    </span>
                  </div>
                  <button onClick={() => ("")}>
                    <i class="fa-solid fa-circle-plus"></i> Update
                  </button>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default NavProductType2Update;
