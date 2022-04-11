import { Fragment, useContext } from "react"
import { Outlet, Link } from "react-router-dom"
import { UserContext } from "../../context/user.context"
import { CartContext } from "../../context/cart.context"
import {ReactComponent as CrownLogo} from '../../assets/crown.svg'
import CartIcon from "../../components/cart-icon/cart-icon.component"
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component"
import { signOutUser } from "../../utils/firebase/firebase.utils"

import {NavLink, LogoContainer, NavLinks, NavigationContainer} from './navigation.styles.jsx'

const Navigation = () => {
  const {currentUser} = useContext(UserContext)
  const {isCartOpen} = useContext(CartContext)
    return(
      <Fragment>
        <NavigationContainer>
          <LogoContainer className="logo-container" to="/">
            <CrownLogo className="logo"/>
          </LogoContainer>
          <NavLinks>
            <NavLink className="nav-link" to="/shop">
                SHOP
            </NavLink>
            {currentUser ? <NavLink onClick={signOutUser} className="nav-link">SIGN OUT</NavLink> : 
            <NavLink className="nav-link" to="/auth">
                SIGN IN
            </NavLink>}
            <CartIcon/>
          </NavLinks>
          {isCartOpen && <CartDropdown/>}
        </NavigationContainer>
        <Outlet/>
      </Fragment>
    )
}

export default Navigation