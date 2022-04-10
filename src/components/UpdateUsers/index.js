import React, { Fragment, useEffect, useState } from "react";
import Nav from "../Nav";
import Container from "../Container";
import "../../scss/NavFull.scss";
import NavTop from "../NavTop/index";
import avatar from "../../images/avatar.jpg";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonIcon from "@mui/icons-material/Person";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
import {
  getUserDetails,
  updateUser,
  clearErrors,
} from "../../actions/userAction";
import Loader from "../layout/Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
const UpdateUsers = () => {
  const [activeMenu, setActiveMenu] = useState(2);
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.userDetails);

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const userId = id;

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
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
      alert.success("Update tai khoan Thanh Cong");
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, alert, error, isUpdated, updateError, user, userId, navigate]);

  const updateUserSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(userId, myForm));
  };

  return (
    <div class="navFull">
      <Nav
        checkActiveMenu={() => setActiveMenu(2)}
        activeMenu={activeMenu}
      ></Nav>
      <div class="nav__Left">
        <NavTop nameNav="User Profile" avatar={avatar} />
        <div class="user__update">
          <Container>
            <div class="row">
              <Fragment>
                <div className="">
                  <div className="">
                    {loading ? (
                      <Loader />
                    ) : (
                      <form className="" onSubmit={updateUserSubmit}>
                        <h1>Update User</h1>

                        <div>
                          <PersonIcon />
                          <input
                            type="text"
                            placeholder="Ho va Ten"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div>
                          <MailOutlineIcon />
                          <input
                            type="email"
                            placeholder="Email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>

                        <div>
                          <VerifiedUserIcon />
                          <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                          >
                            <option value="">Chon Quyen</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                          </select>
                        </div>

                        <Button
                          id=""
                          type="submit"
                          disabled={
                            updateLoading
                              ? true
                              : false || role === ""
                              ? true
                              : false
                          }
                        >
                          Sua
                        </Button>
                      </form>
                    )}
                  </div>
                </div>
              </Fragment>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default UpdateUsers;
