import React, { useState } from 'react'
import Nav from '../Nav'
import '../../scss/NavFull.scss'
import avatar from '../../images/avatar.jpg'
import NavTop from '../NavTop/index'

const NavSetting = () => {
    const [activeMenu , setActiveMenu] = useState(6)
    return (
      <div class="navFull">
        <Nav checkActiveMenu={() => setActiveMenu(activeMenu)} activeMenu={activeMenu}></Nav>
        <div class="nav__Left">
        <NavTop nameNav="Settings" avatar={avatar}/>
      </div>
      </div>
    )
}

export default NavSetting