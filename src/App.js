import "./App.css";
import Header from "./components/Header";
import Outside from "./components/Outside";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import MainProduct from "./components/MainProduct";
import ScrollToTop from "./components/ScrollToTop";
import MainCart from "./components/MainCart";
import { useEffect, useState } from "react";
import MainOrder from "./components/MainOrder";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Toasts from "./components/Toasts";
import HeaderMobile from "./components/HeaderMobile";
import MainDM__Mobile from "./components/MainDM__Mobile";
import ModalMobline from "./components/ModalMobile";
import MainCategory from "./components/MainCategory";
import MainUser from "./components/MainUser";
import MainUserOrder from "./components/MainUserOrder";
import MainUserPassword from "./components/MainUserPassword";
import NavDashBoard from "./components/NavDashBoard";
import NavOrder from "./components/OrderList";
import NavProductManager from "./components/NavProductManager";
import ProductList from "./components/ProductList";
import NavProductType3 from "./components/NavProductType3";
import NewProduct from "./components/NewProduct";
import ProcessOrder from "./components/ProcessOrder";
import NavProductType3Add from "./components/NavProductType3Add";
import UpdateProduct from "./components/UpdateProduct";
import NavProductType2Update from "./components/NavProductType2Update";
import NavProductSearch from "./components/NavProductSearch";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./components/Header/UserOptions";
import { useSelector } from "react-redux";
import ProtectedRoute from "../src/components/Route/ProtectedRoute";
import ForgotPassword from "./components/MainUserPassword/FotgotPassword";
import ResetPassword from "./components/MainUserPassword/ResetPassword";
import OrderSuccess from "./components/OrderSuccess";
import OrderDetails from "./components/OrderDetails";
import OrderList from "./components/OrderList";
import UsersList from "./components/UsersList";
import UpdateUsers from "./components/UpdateUsers";
import MedicineReviews from "./components/MedicineReviews";
function App(props) {
  const [newCart, setNewCart] = useState(false);

  const { isAuthenticated, user, loading } = useSelector((state) => state.user);

  const clickAddCArt = () => {
    toast.success("Thêm sản phẩm thành công", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setNewCart(true);
  };

  const [checkHeader, setCheckHeader] = useState(false);
  const clickCheckHeader = () => {
    setCheckHeader(true);
  };

  const [tosts2, setTosts2] = useState(false);
  const clickTosts2 = () => {
    setTosts2(true);
    toast.success("Thêm sản phẩm thành công", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const [tosts3, setTosts3] = useState(false);
  const clickTosts3 = () => {
    setTosts3(true);
    toast.success("Thêm sản phẩm thành công", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const [tosts1, setTosts1] = useState(false);
  const clickTosts1 = () => {
    setTosts1(true);
    toast.success("Thêm sản phẩm thành công", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const [tosts4, setTosts4] = useState(false);
  const clickTosts4 = () => {
    setTosts4(true);
    toast.success("Thêm sản phẩm thành công", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const [tosts5, setTosts5] = useState(false);
  const clickTosts5 = () => {
    setTosts5(true);
    toast.success("Thêm sản phẩm thành công", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const [tosts6, setTosts6] = useState(false);
  const clickTosts6 = () => {
    setTosts6(true);
    toast.success("Thêm sản phẩm thành công", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    const handleHeaderMobile = () => {
      if (window.scrollY > 100 && window.innerWidth <= 1200) {
        document.querySelector("header").classList.add("activeMobile");
      } else {
        document.querySelector("header").classList.remove("activeMobile");
      }
    };
    window.addEventListener("scroll", handleHeaderMobile);
    return () => {
      window.removeEventListener("scroll", handleHeaderMobile);
    };
  }, []);

  useEffect(() => {
    const handleMobile = () => {
      if (window.innerWidth <= 1200) {
        document
          .querySelector(".headerMobile")
          .classList.add("activeHeader__Mobile");
      } else {
        document
          .querySelector(".headerMobile")
          .classList.remove("activeHeader__Mobile");
      }
    };
    window.addEventListener("resize", handleMobile);
    return () => {
      window.removeEventListener("resize", handleMobile);
    };
  }, []);

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  const location = useLocation();
  return (
    <div className="App">
      <ScrollToTop></ScrollToTop>
      <Header
        newCart={newCart}
        tosts6={tosts6}
        tosts5={tosts5}
        tosts4={tosts4}
        tosts1={tosts1}
        tosts2={tosts2}
        tosts3={tosts3}
        checkHeader={checkHeader}
      ></Header>
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route path="/" element={<Navigate replace to="/medicines" />}></Route>
        <Route
          path="/medicines"
          element={<MainCategory addCart4={clickTosts4} />}
        ></Route>
        <Route
          path="/medicines/:keyword"
          element={<MainCategory addCart4={clickTosts4} />}
        ></Route>
        <Route
          exact
          path="/medicine/:id"
          element={
            <MainProduct
              addCartNow={clickTosts5}
              addCart1={clickTosts1}
              addcart2={clickTosts2}
              addCart3={clickTosts3}
            />
          }
        ></Route>
        <Route
          path="/medicines/search"
          element={<NavProductSearch></NavProductSearch>}
        ></Route>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/cart" element={<MainCart></MainCart>}></Route>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route
            path="/me/update"
            element={<MainUser checkHeader={clickCheckHeader} />}
          />
        </Route>

        <Route path="/password/forgot" element={<ForgotPassword />} />

        <Route path="/password/reset/:token" element={<ResetPassword />} />

        <Route element={<ProtectedRoute />}>
          <Route
            path="/password/update"
            element={<MainUserPassword></MainUserPassword>}
          />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/shipping" element={<MainOrder></MainOrder>} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/success" element={<OrderSuccess></OrderSuccess>} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route
            path="/me/orders"
            element={<MainUserOrder></MainUserOrder>}
          ></Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route
            path="/me/orders/:id"
            element={<OrderDetails></OrderDetails>}
          ></Route>
        </Route>

        <Route element={<ProtectedRoute isAdmin={true} />}>
          <Route
            path="/admin/dashboard"
            element={<NavDashBoard></NavDashBoard>}
          ></Route>
        </Route>

        <Route element={<ProtectedRoute isAdmin={true} />}>
          <Route path="/admin/users" element={<UsersList></UsersList>}></Route>
        </Route>

        <Route element={<ProtectedRoute isAdmin={true} />}>
          <Route
            path="/admin/user/:id"
            element={<UpdateUsers></UpdateUsers>}
          ></Route>
        </Route>

        <Route element={<ProtectedRoute isAdmin={true} />}>
          <Route path="/admin/orders" element={<NavOrder></NavOrder>}></Route>
        </Route>

        <Route element={<ProtectedRoute isAdmin={true} />}>
          <Route
            path="admin/medicines"
            element={<ProductList></ProductList>}
          ></Route>
        </Route>

        <Route element={<ProtectedRoute isAdmin={true} />}>
          <Route
            path="admin/medicine"
            element={<NewProduct></NewProduct>}
          ></Route>
        </Route>

        <Route element={<ProtectedRoute isAdmin={true} />}>
          <Route
            path="admin/medicine/:id"
            element={<UpdateProduct></UpdateProduct>}
          ></Route>
        </Route>

        <Route element={<ProtectedRoute isAdmin={true} />}>
          <Route path="admin/orders" element={<OrderList></OrderList>}></Route>
        </Route>

        <Route element={<ProtectedRoute isAdmin={true} />}>
          <Route
            path="/admin/order/:id"
            element={<ProcessOrder></ProcessOrder>}
          ></Route>
        </Route>

        <Route element={<ProtectedRoute isAdmin={true} />}>
          <Route
            path="/admin/reviews"
            element={<MedicineReviews></MedicineReviews>}
          ></Route>
        </Route>
      </Routes>
      <Outside></Outside>
      <Toasts></Toasts>
      <HeaderMobile></HeaderMobile>
      {location.pathname === "/danhmuc" && window.innerWidth <= 1200 ? (
        <MainDM__Mobile></MainDM__Mobile>
      ) : null}
      {location.pathname === "/taikhoan" && window.innerWidth <= 1200 ? (
        <ModalMobline></ModalMobline>
      ) : null}
    </div>
  );
}

export default App;
