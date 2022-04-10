import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListMenuUser from "../../../Configs/ListMenuUser";
import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  updateProfile,
  clearErrors,
  loadUser,
} from "../../../../actions/userAction";
import { useNavigate } from "react-router-dom";
import Loader from "../../../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../../../../constants/userConstants";

const ContentUser = (props) => {
  // const [activeGender, setActiveGender] = useState(1);
  const { checkUX, activeUX } = props;
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const { error, isUpdated, loading1 } = useSelector((state) => state.profile);

  function logoutUser() {
    dispatch(logout());
    if (isAuthenticated) {
      navigate("/");
    }
  }

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Thong tin da dc update thanh cong");
      dispatch(loadUser());

      navigate("/medicines");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
    if (isAuthenticated === false) {
      navigate("/medicines");
    }
  }, [dispatch, error, alert, user, isUpdated, isAuthenticated, navigate]);

  return (
    <Fragment>
      {loading || loading1 ? (
        <Loader />
      ) : (
        <Fragment>
          <div class="col-md-4">
            <div class="sectionLeft__User">
              <div class="userContent">
                <div class="avatarUser">
                  <img
                    src={user.avatar.url ? user.avatar.url : "/Profile.png"}
                    alt=""
                  ></img>
                </div>
                <div class="nameUser">
                  <span>{user.name}</span>
                </div>
              </div>
              <div class="UserMenu">
                <ul>
                  {ListMenuUser.map((name, index) => (
                    <li
                      key={name.id}
                      onClick={checkUX}
                      className={name.id === activeUX ? "activeUserMenu" : ""}
                    >
                      <Link to={"/me/" + name.link}>
                        <span>{name.icon}</span>
                        <h3 class="nameList">
                          {name.name}{" "}
                          {name.nameChild ? (
                            <span>{name.nameChild}</span>
                          ) : null}{" "}
                        </h3>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-8">
            <div class="sectionUser__Right">
              <div class="nameSection__User">
                <h1>Chỉnh sửa thông tin cá nhân</h1>
              </div>

              <form
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div class="row">
                  <div class="col-md-5">
                    <div class="contentUser__Left">
                      <div class="imageSection__User">
                        <img src={avatarPreview} alt={user.name} />
                      </div>
                      <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={updateProfileDataChange}
                      />
                    </div>
                  </div>
                  <div class="col-md-7">
                    <div class="formUser__Left">
                      <div class="formName">
                        <div class="inputFile">
                          <label>
                            Họ va Ten<span>*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Name"
                            required
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          ></input>
                        </div>
                      </div>
                      {/* <div class="formGender">
                            <label>Giới tính</label>
                            <div class="d-flex">
                                {
                                    Gender.map(name => (
                                        <div class="radioFile">
                                            <label onClick={() => setActiveGender(name.id)} className={`checkRadioFull ${name.id === activeGender ? "activeRadio" : ""}`}>
                                                <span class="radioCheck"></span>
                                                <div>{name.name}</div>
                                                <input type='radio' name='gender' defaultValue="1"></input>
                                            </label>
                                        </div>
                                    ))
                                }
                            </div>
                        </div> */}
                      <div class="formEmail">
                        <div class="inputFile">
                          <label>Email</label>
                          <input
                            type="email"
                            placeholder="Email"
                            required
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          ></input>
                        </div>
                      </div>
                      <div class="formSDT">
                        <div class="inputFile">
                          <label>Tham gia vao</label>
                          <input
                            defaultValue={String(user.createdAt).substring(
                              0,
                              10
                            )}
                            disabled
                            autoComplete="on"
                          ></input>
                        </div>
                      </div>
                      <Link to="/password/update" class="buttonChange">
                        Đổi mật khẩu
                      </Link>
                      <button type="submit">Luu</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ContentUser;
