import React from "react";
import "../../scss/Admin.scss";

const LoginAdmin = (props) => {
  return (
    <div class="Admin">
      <div class="Modal__Admin">
        <div class="row">
          <div class="col-md-12">
            <div class="Modal__Admin__Login">
              <div class="name__Login__Modal">
                <h1>Đăng nhập</h1>
              </div>
              <div class="form__Login__Modal">
                <div class="formChildren">
                  <label>Email:</label>
                  <input
                    type="email"
                    required
                    placeholder="Nhập tài khoản"
                  ></input>
                </div>
                <div class="formChildren">
                  <label>Password:</label>
                  <input
                    type="password"
                    required
                    placeholder="Nhập mật khẩu"
                  ></input>
                </div>
                <button>Đăng nhập</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
