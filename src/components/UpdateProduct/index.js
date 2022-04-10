import React, { useState, useEffect } from "react";
import Nav from "../Nav";
import avatar from "../../images/avatar.jpg";
import NavTop from "../NavTop";
import Container from "../Container";
import ProductType from "../NavProduct/components/ProductType";
import ProductName from "../NavProduct/components/ProductName";
import ProductAddType from "../NavProduct/components/ProductAddType";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateMedicine,
  getMedicineDetails,
} from "../../actions/medicineAction";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { UPDATE_PRODUCT_RESET } from "../../constants/medicineConstants";
import { Link, useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const [activeType, setActiveType] = useState(1);
  const [activeMenu, setActiveMenu] = useState(4);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { error, medicine } = useSelector((state) => state.medicineDetails);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.medicine);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = ["Laptop", "Thuoc"];

  const medicineId = id;

  useEffect(() => {
    if (medicine && medicine._id !== medicineId) {
      dispatch(getMedicineDetails(medicineId));
    } else {
      setName(medicine.name);
      setDescription(medicine.description);
      setTitle(medicine.title);
      setDiscount(medicine.discount);
      setPrice(medicine.price);
      setCategory(medicine.category);
      setStock(medicine.Stock);
      setOldImages(medicine.images);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Update San pham Thanh Cong");
      navigate("/admin/medicines");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    isUpdated,
    medicineId,
    medicine,
    updateError,
    navigate,
  ]);

  const updateMedicineSubmit = (e) => {
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
    dispatch(updateMedicine(medicineId, myForm));
  };

  const updateMedicineImages = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

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
                <ProductName nameProduct="Quản lý sản phẩm"></ProductName>
                {/* <ProductAddType
                  nameLink="/product/type1/add"
                  nameTypeAdd="Thêm sản phẩm"
                ></ProductAddType> */}
                <div class="Product__Type1__Add">
                  <form
                    encType="multipart/form-data"
                    onSubmit={updateMedicineSubmit}
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
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        >
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
                          value={Stock}
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
                          value={discount}
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
                          value={price}
                        />
                      </div>
                    </div>
                    <div class="Product__Type1__Add__Right">
                      <div class="logo512">
                        {oldImages &&
                          oldImages.map((image, index) => (
                            <img
                              key={index}
                              src={image.url}
                              alt="Hinh anh cu"
                            />
                          ))}
                      </div>
                      <div class="logo512">
                        {imagesPreview.map((image, index) => (
                          <img key={index} src={image} alt="Hinh anh" />
                        ))}
                      </div>
                      <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={updateMedicineImages}
                        multiple
                      />
                    </div>
                    <Button type="submit" disabled={loading ? true : false}>
                      Sua
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

export default UpdateProduct;
