import React, { useState, useEffect } from "react";
import Container from "../Container";
import Nav from "../Nav";
import ProductAddType from "../NavProduct/components/ProductAddType";
import ProductName from "../NavProduct/components/ProductName";
import ProductType from "../NavProduct/components/ProductType";
import avatar from "../../images/avatar.jpg";
import NavTop from "../NavTop";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createMedicine } from "../../actions/medicineAction";
import { useAlert } from "react-alert";
import Button from "@mui/material/Button";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useNavigate } from "react-router-dom";
import { NEW_PRODUCT_RESET } from "../../constants/medicineConstants";

const NewProduct = () => {
  const [activeType, setActiveType] = useState(1);
  const [activeMenu, setActiveMenu] = useState(4);

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.newMedicine);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = ["Laptop", "Thuoc"];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      navigate("/admin/medicines");
      alert.success("Tao San pham thanh cong");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, success, navigate]);

  const createMedicineSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("discount", discount);
    myForm.set("description", description);
    myForm.set("title", title);
    myForm.set("category", category);
    myForm.set("Stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createMedicine(myForm));
  };

  const createMedicineImages = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((a) => [...a, reader.result]);
          setImages((a) => [...a, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

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
                <ProductName nameProduct="Thêm sản phẩm"></ProductName>
                <div class="Product__Type1__Add">
                  <form
                    encType="multipart/form-data"
                    onSubmit={createMedicineSubmit}
                  >
                    <div class="Product__Type1__Add__Left">
                      <div class="Children__Type1">
                        <label>Tên sản phẩm</label>
                        <input
                          type="text"
                          placeholder="Ten san Pham"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        ></input>
                      </div>
                      <div class="Children__Type1">
                        <label>Mo ta sản phẩm</label>
                        <input
                          placeholder="Nội dung mô tả sản phẩm"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          required
                          type="text"
                        ></input>
                      </div>
                      <div class="Children__Type1">
                        <label>Nội dung chi tiet sản phẩm</label>
                        <textarea
                          placeholder="Chi tiet San pham"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          cols="30"
                          rows="1"
                        ></textarea>
                      </div>

                      <div class="Children__Type1">
                        <label>Danh mục sản phẩm</label>
                        <select onChange={(e) => setCategory(e.target.value)}>
                          <option value="">Chon Loai</option>
                          {categories.map((cate) => (
                            <option key={cate} value={cate}>
                              {cate}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div class="Children__Type1">
                        <label>Số lượng sản phẩm</label>
                        <input
                          type="number"
                          placeholder="Stock"
                          required
                          onChange={(e) => setStock(e.target.value)}
                        />
                      </div>
                      <div class="Children__Type1">
                        <label>Số tiền giảm giá sản phẩm</label>
                        <input
                          type="number"
                          placeholder="Giam gia"
                          required
                          min="0"
                          onChange={(e) => setDiscount(e.target.value)}
                        />
                      </div>
                      <div class="Children__Type1">
                        <label>Số tiền sản phẩm</label>
                        <input
                          type="number"
                          placeholder="Gia tien"
                          required
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                    </div>
                    <div class="Product__Type1__Add__Right">
                      <div class="logo512">
                        {imagesPreview.map((image, index) => (
                          <img key={index} src={image} alt="Hinh anh" />
                        ))}
                      </div>
                      <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={createMedicineImages}
                        multiple
                      />
                    </div>
                    <Button type="submit" disabled={loading ? true : false}>
                      Create
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
