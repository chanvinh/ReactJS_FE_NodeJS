import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../../../actions/cartAction";
import { useAlert } from "react-alert";
import { Country, State } from "country-state-city";
import { useNavigate } from "react-router-dom";
const ModalMainOrder = (props) => {
  const { closeXModalDC, clickXN } = props;

  const dispatch = useDispatch();
  const alert = useAlert();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [phoneNumber, setphoneNumber] = useState(shippingInfo.phoneNumber);
  const navigate = useNavigate();

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNumber.length < 10 || phoneNumber.length > 10) {
      alert.error("Phone Number phai co 10 ki tu");
      return;
    }
    clickXN();
    dispatch(saveShippingInfo({ address, city, state, country, phoneNumber }));
    alert.success("Cap nhat thanh cong");
  };

  return (
    <Fragment>
      <div class="modalMainOrder">
        <div class="modalMainOrder_Children">
          <div class="nameModalOrder">
            <h1>Nhập địa chỉ nhận hàng</h1>
            <i onClick={closeXModalDC} class="fa-solid fa-xmark"></i>
          </div>
          <div class="contentModalOrder">
            <form encType="multipart/form-data" onSubmit={shippingSubmit}>
              <div class="children_body">
                <label>Dia Chi *</label>
                <input
                  type="text"
                  placeholder="Dia Chi"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <span id="checkusername"></span>
                <label>Thanh Pho *</label>
                <input
                  type="text"
                  placeholder="Thanh Pho"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <span id="checkusername"></span>
                <label>So Dien Thoai *</label>
                <input
                  type="number"
                  placeholder="So Dien Thoai"
                  required
                  value={phoneNumber}
                  onChange={(e) => setphoneNumber(e.target.value)}
                  size="10"
                />
                <span id="checkusername"></span>
                <label></label>
                <select
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="">Country</option>
                  {Country &&
                    Country.getAllCountries().map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>

                {country && (
                  <select
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  >
                    <option value="">State</option>
                    {State &&
                      State.getStatesOfCountry(country).map((item) => (
                        <option key={item.isoCode} value={item.isoCode}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                )}
                <button type="submit" disabled={state ? false : true}>
                  Xác nhận
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ModalMainOrder;
