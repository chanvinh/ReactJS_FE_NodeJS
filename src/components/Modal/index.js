import React, { Fragment, useRef, useState, useEffect } from "react";
import "../../scss/Modal.scss";
import banner from "../../images/banner (1).png";
import {
  useNavigate,
  Link,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { useAlert } from "react-alert";
import {
  login,
  clearErrors,
  register,
  loadUser,
} from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
const Modal = (props) => {
  const navigate = useNavigate();
  const { toggleCloseUser, userDN, clickDN } = props;
  const [isMK, setIsMK] = useState(false);
  const toggleMK = () => {
    setIsMK(true);
    setIsDK(false);
    setIsDN(false);
  };

  const [isDK, setIsDK] = useState(false);
  const toggleDK = () => {
    setIsDK(!isDK);
    setIsDN(true);
  };

  const [isDN, setIsDN] = useState(true);
  const toggleDN = () => {
    setIsDN(!isDN);
    setIsDK(true);
  };
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };

  // useEffect(() => {
  //   const closeModal = () => {
  //     document.querySelector("body").style = null;
  //     document.querySelector(".Modal-full").style.display = "none";
  //   };
  //   let buttonDN = document.getElementById("buttonDN");
  //   buttonDN.addEventListener("click", closeModal);
  //   return () => {
  //     buttonDN.removeEventListener("click", closeModal);
  //   };
  // }, []);

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  // console(location);
  // const redirect = location.search ? location.search.split("=")[1] : "/me/update";
  // console.log(redirect);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate("/medicines");
      clickDN();
    }

    //
  }, [dispatch, error, alert, isAuthenticated, navigate]);

  return (
    <Fragment>
      {loading && isAuthenticated ? (
        <Loader />
      ) : (
        <div class="Modal-full">
          <div class="Modal-User">
            <div class="Modal-User_left">
              <div class="Modal-User_left-banner">
                <img src={banner} alt={banner} />
              </div>
              <div class="Modal-User_left-body">
                <h1>SbCode xin chào !</h1>
                <p>
                  Hãy đăng nhập để được hưởng các đặc quyền riêng dành cho
                  <svg
                    class="Tooltip_icon__3t6rX"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="#112950"
                  >
                    <g opacity="0.2">
                      <path
                        d="M16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8ZM5.496 6.033H6.321C6.459 6.033 6.569 5.92 6.587 5.783C6.677 5.127 7.127 4.649 7.929 4.649C8.615 4.649 9.243 4.992 9.243 5.817C9.243 6.452 8.869 6.744 8.278 7.188C7.605 7.677 7.072 8.248 7.11 9.175L7.113 9.392C7.11405 9.45761 7.14085 9.52017 7.18762 9.5662C7.23439 9.61222 7.29738 9.63801 7.363 9.638H8.174C8.2403 9.638 8.30389 9.61166 8.35078 9.56478C8.39766 9.51789 8.424 9.4543 8.424 9.388V9.283C8.424 8.565 8.697 8.356 9.434 7.797C10.043 7.334 10.678 6.82 10.678 5.741C10.678 4.23 9.402 3.5 8.005 3.5C6.738 3.5 5.35 4.09 5.255 5.786C5.25363 5.81829 5.25888 5.85053 5.27043 5.88072C5.28198 5.91091 5.29958 5.93841 5.32216 5.96155C5.34473 5.98468 5.3718 6.00296 5.40169 6.01524C5.43159 6.02753 5.46368 6.03357 5.496 6.033ZM7.821 12.476C8.431 12.476 8.85 12.082 8.85 11.549C8.85 10.997 8.43 10.609 7.821 10.609C7.237 10.609 6.812 10.997 6.812 11.549C6.812 12.082 7.237 12.476 7.822 12.476H7.821Z"
                        fill="inherit"
                      ></path>
                    </g>
                  </svg>
                  <div class="contentTool">
                    <h1>Quyền lợi khi là thành viên</h1>
                    <ul>
                      <li>
                        <p>Quà tặng sinh nhật</p>
                      </li>
                      <li>
                        <p>Mua sản phẩm thứ 2 giá 1k</p>
                      </li>
                      <li>
                        <p>Sản phẩm giảm giá đến 50%</p>
                      </li>
                      <li>
                        <p>
                          Ưu đãi bất ngờ, thiết kế riêng cho từng thành viên
                        </p>
                      </li>
                      <li>
                        <p>Quà tặng nâng hạng VIP</p>
                      </li>
                      <li>
                        <p>Tích điểm đến 6% cho khách hàng VIP</p>
                      </li>
                    </ul>
                  </div>
                </p>
              </div>
              <div class="Modal-User_left-bottom">
                <p>
                  Bạn đã là thành viên SBCode vui lòng nhấp
                  {/* <span onClick={() => setIsMK(toggleMK)}>tạo mật khẩu</span> */}
                  để tiếp tục sử dụng. Tất cả thông tin tài khoản và điểm tích
                  lũy đều không thay đổi
                </p>
              </div>
            </div>
            <div class="Modal-User_right">
              <div class="closeModal" onClick={toggleCloseUser}>
                <i class="fa-solid fa-x"></i>
              </div>
              {isMK ? (
                <div class="timmatkhau">
                  <h1>Đặt mật khẩu mới</h1>
                  <p>
                    Vui lòng nhập số điện thoại của bạn, SBCode sẽ gửi cho bạn
                    một mã để đặt mới mật khẩu của mình.
                  </p>
                  <div class="formUser">
                    <form method="" action="">
                      <div class="username_full">
                        <div class="username">
                          <label>
                            <i class="fa-solid fa-user"></i>
                          </label>
                          <input
                            type="text"
                            placeholder="Số điện thoại của bạn"
                          ></input>
                        </div>
                        <p id="checkUsername"></p>
                      </div>
                      <button type="submit">Tiếp tục</button>
                    </form>
                  </div>
                </div>
              ) : null}
              {isDK ? (
                <div class="dangky">
                  <form
                    className="signUpForm"
                    encType="multipart/form-data"
                    onSubmit={registerSubmit}
                  >
                    <h1>Đăng ký</h1>
                    <div class="formUser">
                      <div class="username_full">
                        <div class="username">
                          <label>
                            <i class="fa-solid fa-user"></i>
                          </label>
                          <input
                            type="text"
                            placeholder="Nhập họ và tên của bạn"
                            required
                            name="name"
                            value={name}
                            onChange={registerDataChange}
                          ></input>
                        </div>
                      </div>
                      <div class="username_full">
                        <div class="username">
                          <label>
                            <i class="fa-solid fa-envelope"></i>
                          </label>
                          <input
                            type="email"
                            placeholder="Nhập Email của bạn"
                            required
                            name="email"
                            value={email}
                            onChange={registerDataChange}
                          ></input>
                        </div>
                      </div>
                      <div class="password_full">
                        <div class="password">
                          <label>
                            <i class="fa-solid fa-lock"></i>
                          </label>
                          <input
                            type="password"
                            placeholder="Mật khẩu"
                            required
                            name="password"
                            value={password}
                            onChange={registerDataChange}
                          ></input>
                        </div>
                      </div>
                      <div class="username_full">
                        <div class="username">
                          <img src={avatarPreview} alt="Avatar" />
                          <input
                            style={{ marginLeft: "10px" }}
                            type="file"
                            name="avatar"
                            accept="image/*"
                            onChange={registerDataChange}
                          />
                        </div>
                      </div>
                      <label class="checkboxYes" form="checkYes">
                        <input type="checkbox" id="checkYes"></input> Tôi đã đọc
                        và đồng ý điều khoản sử dụng{" "}
                        <span>
                          thỏa thuận người dùng SBCode, chính sách bảo mật.
                        </span>
                      </label>
                      <button type="submit" value="Register">
                        Đăng ký
                      </button>
                      <div class="createUser">
                        <h1>Bạn đã có tài khoản SBCode?</h1>
                        <p onClick={toggleDK}>Đăng nhập</p>
                      </div>
                    </div>
                  </form>
                </div>
              ) : null}
              {isDN ? (
                <div class="dangnhap">
                  <form onSubmit={loginSubmit}>
                    <h1>Đăng nhập</h1>
                    <div class="formUser">
                      <div class="username_full">
                        <div class="username">
                          <label>
                            <i class="fa-solid fa-user"></i>
                          </label>
                          <input
                            type="email"
                            placeholder="Nhap email của bạn"
                            required
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                          ></input>
                        </div>
                      </div>
                      <div class="password_full">
                        <div class="password">
                          <label>
                            <i class="fa-solid fa-lock"></i>
                          </label>
                          <input
                            type="password"
                            placeholder="Nhap mat khau"
                            required
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                          ></input>
                        </div>
                        <p id="checkPassowrd"></p>
                      </div>
                      <div class="forget_password">
                        <a href="/password/forgot">Quen mat khau?</a>
                      </div>
                      <button type="submit" value="Dang nhap">
                        Đăng nhập
                      </button>
                      <div class="createUser">
                        <h1>Bạn chưa có tài khoản SBCode?</h1>
                        <p onClick={toggleDN}>Đăng ký ngay</p>
                      </div>
                    </div>
                  </form>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Modal;
