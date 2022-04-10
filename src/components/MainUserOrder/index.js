import React, { useState } from "react";
import Container from "../Container";
import SectionNavUser from "../MainUser/components/SectionNavUser";
import { Link } from "react-router-dom";
import SectionUserOrder from "./SectionUserOrder";

import SectionUser from "../SectionUser";

const MainUserOrder = () => {
  const [activeList, setActiveList] = useState(2);
  return (
    <div class="mainUser">
      <SectionNavUser name="Lịch sử giao dịch"></SectionNavUser>
      <div class="contentMain__User">
        <Container>
          <div class="row">
            <div class="col-md-12">
              <SectionUserOrder></SectionUserOrder>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default MainUserOrder;
