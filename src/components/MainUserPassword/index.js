import React, { useState } from "react";
import { Link } from "react-router-dom";
import ListMenuUser from "../Configs/ListMenuUser";
import avatar from "../../images/avatar.jpg";
import Container from "../Container";
import SectionNavUser from "../MainUser/components/SectionNavUser";
import SectionChangePassword from "./SectionChangePassword";
import { useDispatch, useSelector } from "react-redux";

const MainUserPassword = () => {
  const [activeList, setActiveList] = useState(1);
  const { user } = useSelector((state) => state.user);
  return (
    <div class="mainUser">
      <SectionNavUser name="Đổi mật khẩu"></SectionNavUser>
      <div class="contentMain__User">
        <Container>
          <div class="row">
            <div class="col-md-4">
              <div class="sectionLeft__User">
                <div class="userContent">
                  <div class="avatarUser">
                    <img
                      src={user.avatar.url ? user.avatar.url : "/Profile.png"}
                      alt={user.name}
                    />
                  </div>
                  <div class="nameUser">
                    <span>{user.name}</span>
                  </div>
                  {/* <div class="userWeb">
                                    <div class="userWeb__Top">
                                        <div class="userWeb__Top__Left">
                                            <span>Thành viên</span>
                                        </div>
                                        <div class="userWeb__Top__Center">
                                            <p>Để lên hạng bạn cần chi tiêu thêm
                                                <br/>
                                                <span>8.000.000 VND</span>
                                            </p>
                                        </div>
                                        <div class="userWeb__Top__Right">
                                            <span>V.I.P</span>
                                        </div>
                                    </div>
                                </div> */}
                </div>
                <div class="UserMenu">
                  <ul>
                    {ListMenuUser.map((name, index) => (
                      <li
                        key={name.id}
                        onClick={() => setActiveList(name.id)}
                        className={
                          name.id === activeList ? "activeUserMenu" : ""
                        }
                      >
                        <Link to={"/user/" + name.link}>
                          <span>{name.icon}</span>
                          <h3 class="nameList">
                            {name.name}{" "}
                            {name.nameChild ? (
                              <span>{name.nameChild}</span>
                            ) : null}{" "}
                          </h3>
                        </Link>
                        {/* <span>{name.icon}</span>
                                                    <h3 class="nameList">{name.name} {
                                                        name.nameChild ? <span>{name.nameChild}</span> : null
                                                    } </h3> */}
                      </li>
                    ))}
                  </ul>
                  {/* <div class="outAccount">
                                    <p>Đăng xuất</p>
                                </div> */}
                </div>
              </div>
            </div>
            <div class="col-md-8">
              <SectionChangePassword></SectionChangePassword>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default MainUserPassword;
