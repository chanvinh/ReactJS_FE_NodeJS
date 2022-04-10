import React, { useState } from "react";
import Nav from "../Nav";
import NavTop from "../NavTop";
import avatar from "../../images/avatar.jpg";
import Container from "../Container";
import ProductType from "../NavProduct/components/ProductType";
import ProductName from "../NavProduct/components/ProductName";

const NavProductSearch = () => {
  const [activeType, setActiveType] = useState(4);
  const [activeMenu, setActiveMenu] = useState(5);



  return (
    <div class="navFull">
      <Nav
        checkActiveMenu={() => setActiveMenu(activeMenu)}
        activeMenu={activeMenu}
      ></Nav>
      <div class="nav__Left">
        <NavTop nameNav="Products" avatar={avatar}></NavTop>
        <div class="nav__Product">
          <Container>
            <div class="row">
              <div class="col-md-12">
                <ProductType
                  ClickActiveType={() => setActiveType(activeType)}
                  activeType={activeType}
                ></ProductType>
                <ProductName nameProduct="Tìm kiếm sản phẩm"></ProductName>
                <div class="inputSearch">
                  <input
                    type="text"
                    onChange={(e) => ""}
                  ></input>
                </div>
                <div class="Product__Table3">
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Category_ID</th>
                        <th>Title</th>
                        <th>Discount</th>
                        <th>Price</th>
                        <th>Amount</th>
                        <th>Image</th>
                        <th>Content</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {listType1.map((name) => (
                        <tr>
                          <th>{name.id}</th>
                          <th>{name.name}</th>
                          <th>{name.category}</th>
                          <th></th>
                          <th>{name.phone}</th>
                          <th>{name.date}</th>
                        </tr>
                      ))} */}
                      {/* {data.map((name) => ( */}
                        <tr>
                          <td>{"id"}</td>
                          <td>{"name"}</td>
                          <td>{"category_id"}</td>
                          <td>{"title"}</td>
                          <td>{"discount"}</td>
                          <td>{"price"}</td>
                          <td>{"amount"}</td>
                          <td>
                            <img src={""} alt=""/>
                          </td>
                          <td>{"content"}</td>
                        </tr>
                      {/* ))} */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default NavProductSearch;
