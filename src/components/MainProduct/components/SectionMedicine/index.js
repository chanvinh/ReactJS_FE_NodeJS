import React, { Fragment, useEffect, useState } from "react";
import "../../../../scss/MainProduct.scss";
import Container from "../../../Container";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-material-ui-carousel";
import imageThuongHieu from "../../../../images/content_thuonghieu.png";
import {
  clearErrors,
  getMedicineDetails,
  newReview,
} from "../../../../actions/medicineAction";
import { useNavigate, useParams } from "react-router-dom";
import Comment from "./components/Comment";
import ContentList from "./components/ContentList";
import ContentSimilar from "./components/ContentSimilar";
import ContentTab from "./components/ContentTab";
import Loader from "../../../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { addItems } from "../../../../actions/cartAction";
import Rating from "@mui/material/Rating";
import { NEW_REVIEW_RESET } from "../../../../constants/medicineConstants";

const SectionMedicine = (props) => {
  const { addCart1, addCartNow, addCart3, addcart2 } = props;

  const [toggleWrite, setToggleWrite] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const alert = useAlert();
  const { medicine, loading, error } = useSelector(
    (state) => state.medicineDetails
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const reviewSubmit = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("medicineId", id);

    dispatch(newReview(myForm));
  };

  const addToCart = () => {
    dispatch(addItems(id, quantity));
    navigate("/cart");
    alert.success("San pham da duoc them vao gio hang");
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Danh Gia Thanh Cong");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getMedicineDetails(id));
  }, [dispatch, id, error, alert, reviewError, success]);

  const options = {
    size: "large",
    value: medicine.ratings,
    readOnly: true,
    precision: 0.2,
  };
  const [quantity, setQuantity] = useState(1);

  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   autoplay: true,
  // };

  const buttonNext = () => {
    if (medicine.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const buttonPrev = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div class="sectionProduct">
            <Container>
              <div class="row">
                <div class="col-md-5">
                  <div class="slickProduct">
                    <div class="slickProductTop">
                      <Carousel>
                        {medicine.images &&
                          medicine.images.map((item, i) => (
                            <img
                              key={item.url}
                              src={item.url}
                              alt={`${i} Slide`}
                            />
                          ))}
                      </Carousel>
                      <p>
                        Sản phẩm 100% chính hãng, mẫu mã có thể thay đổi theo lô
                        hàng
                      </p>
                    </div>
                    <div class="slickProdctBottom"></div>
                  </div>
                </div>
                <div class="col-md-7">
                  <div class="textProduct">
                    <h1 class="nameProduct">{medicine.name}</h1>
                    <div class="contentProduct">
                      <div class="row">
                        <div class="col-md-7">
                          <div class="priceProduct">
                            <p class="price">
                              {medicine.price *
                                ((100 - medicine.discount) / 100)}{" "}
                              đ
                              {medicine.discount > 0 ? (
                                <>
                                  <span class="delPrice">
                                    <del>{medicine.price} đ</del>
                                  </span>
                                  <span class="discountPrice">
                                    - {medicine.discount}%
                                  </span>
                                </>
                              ) : null}
                            </p>
                            <div>
                              <Rating {...options} />{" "}
                              <span class="name__danhgia">
                                ({medicine.numOfReviews} Danh gia)
                              </span>
                              <p>
                                Trang Thai:{" "}
                                <b
                                  className={
                                    medicine.Stock < 1
                                      ? "redColor"
                                      : "blueColor"
                                  }
                                >
                                  {medicine.Stock < 1 ? "Het Hang" : "Con Hang"}
                                </b>
                              </p>
                            </div>
                          </div>
                          <div class="introduceProduct">
                            <p>
                              {/* Humasis COVID-19 Ag Home Test là thiết bị xét nghiệm chẩn đoán
                  in vitro ban đầu dựa trên phương pháp sắc ký miễn dịch. Thiết
                  bị được thiết kế để phát hiện định tính kháng nguyên
                  SARS-CoV-2 qua mẫu dịch ngoáy mũi ở người nghi ngờ nhiễm
                  COVID-19, phù hợp cho cá nhân tự sử dụng (người từ 14 tuổi trở
                  lên) hoặc cho người không có chuyên môn xét nghiệm cho người
                  khác (từ 3 tuổi trở lên), sử dụng tại những địa điểm như là
                  tại nhà mà không nhất thiết phải thực hiện xét nghiệm tại
                  phòng thí nghiệm. Với giá thành rẻ, xét nghiệm Humasis
                  COVID-19 Ag Home Test được thiết kế phát hiện kháng nguyên
                  SARS-CoV-2 ở người nghi nhiễm nhanh chóng, kịp thời trong vòng
                  15 phút. */}{" "}
                              {medicine.description}
                            </p>
                          </div>
                          <div class="from__Product">
                            {/* <form> */}
                            <div class="numberProduct">
                              <div class="childNumberProduct">
                                <button onClick={buttonPrev}>-</button>
                                <input
                                  id="soluong"
                                  name="soluong"
                                  type="text"
                                  value={quantity}
                                  max={medicine.Stock}
                                />
                                <button onClick={buttonNext}>+</button>
                              </div>
                            </div>
                            <div class="buyProduct">
                              <div class="row">
                                {/* <div class="col-md-4">
                                  <div class="buyNow">
                                    <Link to="/cart" onClick={addToCart}>
                                      Mua ngay
                                    </Link>
                                  </div>
                                </div> */}
                                <div class="col-md-8">
                                  <button
                                    className="cartNow"
                                    onClick={addToCart}
                                    disabled={medicine.Stock < 1 ? true : false}
                                  >
                                    <i class="fa-solid fa-cart-shopping"></i>
                                    Thêm vào giỏ hàng
                                  </button>
                                </div>
                              </div>
                            </div>
                            {/* </form> */}
                          </div>
                          <div class="codeProduct">
                            <p>Mã: {medicine._id}</p>
                          </div>
                        </div>
                        <div class="col-md-5">
                          <div class="delivery">
                            <h1>Các hình thức giao hàng</h1>
                            <p class="contentShip">
                              <span>
                                <i class="fa-solid fa-star"></i> Freeship{" "}
                              </span>
                              cho đơn hàng từ <span>300k</span>
                            </p>
                            <div class="codeDelivery">
                              <p>GHN</p>
                              <p>Ahamove</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </div>
          <div class="sectionContentProduct">
            <Container>
              <div class="row">
                <div class="col-md-12">
                  <ContentTab></ContentTab>
                  <>
                    <div class="contentProduct_Comment">
                      <h1>Đánh giá sản phẩm</h1>
                      {/* <div class="product__customer">
                        <div class="row">
                          <div class="col-md-2">
                            <div class="children1">
                              <h2>5/5</h2>
                              <div class="startChildren1">
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-7">
                            <div class="children2">
                              <div class="children2__1">
                                <div class="startChildren2__1">
                                  <i class="fa-solid fa-star"></i>
                                  <i class="fa-solid fa-star"></i>
                                  <i class="fa-solid fa-star"></i>
                                  <i class="fa-solid fa-star"></i>
                                  <i class="fa-solid fa-star"></i>
                                </div>
                                <span>(27)</span>
                                <div class="percent__start">
                                  <div
                                    class="percent__result"
                                    style={{ width: "80%" }}
                                  ></div>
                                </div>
                              </div>
                              <div class="children2__2">
                                <div class="startChildren2__1">
                                  <i class="fa-solid fa-star"></i>
                                  <i class="fa-solid fa-star"></i>
                                  <i class="fa-solid fa-star"></i>
                                  <i class="fa-solid fa-star"></i>
                                  <i class="fa-solid fa-star"></i>
                                </div>
                                <span>(1)</span>
                                <div class="percent__start">
                                  <div
                                    class="percent__result"
                                    style={{ width: "50%" }}
                                  ></div>
                                </div>
                              </div>
                              <div class="children2__3">
                                <div class="startChildren2__1">
                                  <i class="fa-solid fa-star"></i>
                                  <i class="fa-solid fa-star"></i>
                                  <i class="fa-solid fa-star"></i>
                                  <i class="fa-solid fa-star"></i>
                                  <i class="fa-solid fa-star"></i>
                                </div>
                                <span>(5)</span>
                                <div class="percent__start">
                                  <div
                                    class="percent__result"
                                    style={{ width: "30%" }}
                                  ></div>
                                </div>
                              </div>
                              <div class="children2__4">
                                <div class="startChildren2__1">
                                  <i class="fa-solid fa-star"></i>
                                  <i class="fa-solid fa-star"></i>
                                  <i class="fa-solid fa-star"></i>
                                  <i class="fa-solid fa-star"></i>
                                  <i class="fa-solid fa-star"></i>
                                </div>
                                <span>(0)</span>
                                <div class="percent__start">
                                  <div
                                    class="percent__result"
                                    style={{ width: "0%" }}
                                  ></div>
                                </div>
                              </div>
                              <div class="children2__5">
                                <div class="startChildren2__1">
                                  <i class="fa-solid fa-star"></i>
                                  <i class="fa-solid fa-star"></i>
                                  <i class="fa-solid fa-star"></i>
                                  <i class="fa-solid fa-star"></i>
                                  <i class="fa-solid fa-star"></i>
                                </div>
                                <span>(0)</span>
                                <div class="percent__start">
                                  <div
                                    class="percent__result"
                                    style={{ width: "0%" }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-3">
                            <div class="children3">
                              <h3>Chia sẻ nhận xét về sản phẩm</h3>
                              <button
                                onClick={() => setToggleWrite(!toggleWrite)}
                              >
                                viết nhận xét
                              </button>
                            </div>
                          </div>
                        </div>
                      </div> */}
                      {toggleWrite ? (
                        <div class="write__comment">
                          <div class="chil1">
                            <h2>1. Đánh giá sản phẩm này</h2>
                            <Rating
                              onChange={(e) => setRating(e.target.value)}
                              value={rating}
                              size="large"
                            />
                          </div>
                          <div class="chil2">
                            <h2>2. Viết nhận xét của bạn vào bên dưới:</h2>
                            <textarea
                              cols="30"
                              rows="5"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              placeholder="Nhận xét của bạn về sản phẩm"
                            ></textarea>
                          </div>
                          <div class="chil3">
                            <button onClick={reviewSubmit}>Gửi nhận xét</button>
                          </div>
                        </div>
                      ) : null}
                      {medicine.reviews && medicine.reviews[0] ? (
                        <>
                          {medicine.reviews.map((review) => (
                            <Comment key={review._id} review={review} />
                          ))}
                        </>
                      ) : (
                        <div class="no__comments">
                          <img src={imageThuongHieu}></img>
                          <p>Hiện chưa có đánh già nào cho sản phẩm này</p>
                        </div>
                      )}
                    </div>
                  </>
                  {/* <ContentList addCart3={addCart3}></ContentList> */}
                </div>
                {/* <div class="col-md-3">
                  <ContentSimilar addcart2={addcart2}></ContentSimilar>
                </div> */}
              </div>
            </Container>
          </div>
        </>
      )}
    </Fragment>
  );
};

export default SectionMedicine;
