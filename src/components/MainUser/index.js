import React, {useState } from "react";
import "../../scss/MainUser.scss";
import Container from "../Container";
import ContentUser from "./components/ContentUser";
import SectionNavUser from "./components/SectionNavUser";


const MainUser = (props) => {
  const [activeList, setActiveList] = useState(1);
  const { checkHeader} = props;
  return (
    <div class="mainUser">
      <SectionNavUser name="Trang cá nhân"></SectionNavUser>
      <div class="contentMain__User">
        <Container>
          <div class="row">
            <ContentUser  checkUX={() => setActiveList(activeList)}
                activeUX={activeList}
                checkHeader={checkHeader} />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default MainUser;
