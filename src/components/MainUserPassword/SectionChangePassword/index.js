import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword, clearErrors } from "../../../actions/userAction";
import { useNavigate } from "react-router-dom";
import Loader from "../../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../../constants/userConstants";

const SectionChangePassword = (props) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Cap nhat mat khau thanh cong");

      navigate("/me/update");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, alert, isUpdated, navigate]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div class="sectionChangePassword">
            <div class="nameSection__User">
              <Link to="/me/update">
                <svg
                  stroke="black"
                  width="10"
                  height="16"
                  viewBox="0 0 10 16"
                  fill="none"
                >
                  <path
                    d="M8.5 15L1.5 8L8.5 1"
                    stroke="inherit"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </Link>
              <h1>Đổi mật khẩu</h1>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="formChangePassword">
                  <form onSubmit={updatePasswordSubmit}>
                    <div class="inputFile">
                      <label>
                        Mật khẩu hiện tại <span>*</span>
                      </label>
                      <div class="inputChild">
                        <span>
                          <svg
                            width="16"
                            height="18"
                            viewBox="0 0 16 18"
                            fill="none"
                          >
                            <path
                              d="M11.7239 6.83548V5.04464C11.698 2.94548 9.97471 1.26548 7.87638 1.29131C5.82055 1.31714 4.15805 2.97214 4.12305 5.02798V6.83548"
                              stroke="#8894A7"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M7.92448 10.7969V12.6477"
                              stroke="#8894A7"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M7.92435 6.35352C3.13685 6.35352 1.54102 7.66018 1.54102 11.5793C1.54102 15.4993 3.13685 16.806 7.92435 16.806C12.7118 16.806 14.3085 15.4993 14.3085 11.5793C14.3085 7.66018 12.7118 6.35352 7.92435 6.35352Z"
                              stroke="#8894A7"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                          </svg>
                        </span>
                        <input
                          type="password"
                          placeholder="Mat khau cu"
                          required
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                        ></input>
                      </div>
                    </div>
                    <div class="inputFile">
                      <label>
                        Mật khẩu mới <span>*</span>
                      </label>
                      <div class="inputChild">
                        <span>
                          <svg
                            width="16"
                            height="18"
                            viewBox="0 0 16 18"
                            fill="none"
                          >
                            <path
                              d="M11.7239 6.83548V5.04464C11.698 2.94548 9.97471 1.26548 7.87638 1.29131C5.82055 1.31714 4.15805 2.97214 4.12305 5.02798V6.83548"
                              stroke="#8894A7"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M7.92448 10.7969V12.6477"
                              stroke="#8894A7"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M7.92435 6.35352C3.13685 6.35352 1.54102 7.66018 1.54102 11.5793C1.54102 15.4993 3.13685 16.806 7.92435 16.806C12.7118 16.806 14.3085 15.4993 14.3085 11.5793C14.3085 7.66018 12.7118 6.35352 7.92435 6.35352Z"
                              stroke="#8894A7"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                          </svg>
                        </span>
                        <input
                          type="password"
                          placeholder="Mat khau moi"
                          required
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        ></input>
                      </div>
                    </div>
                    <div class="inputFile">
                      <label>
                        Nhập lại mật khẩu mới <span>*</span>
                      </label>
                      <div class="inputChild">
                        <span>
                          <svg
                            width="16"
                            height="18"
                            viewBox="0 0 16 18"
                            fill="none"
                          >
                            <path
                              d="M11.7239 6.83548V5.04464C11.698 2.94548 9.97471 1.26548 7.87638 1.29131C5.82055 1.31714 4.15805 2.97214 4.12305 5.02798V6.83548"
                              stroke="#8894A7"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M7.92448 10.7969V12.6477"
                              stroke="#8894A7"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M7.92435 6.35352C3.13685 6.35352 1.54102 7.66018 1.54102 11.5793C1.54102 15.4993 3.13685 16.806 7.92435 16.806C12.7118 16.806 14.3085 15.4993 14.3085 11.5793C14.3085 7.66018 12.7118 6.35352 7.92435 6.35352Z"
                              stroke="#8894A7"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                          </svg>
                        </span>
                        <input
                          type="password"
                          placeholder="Xac nhan mat khau"
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        ></input>
                      </div>
                    </div>
                    <button type="submit">Xác nhận</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default SectionChangePassword;
