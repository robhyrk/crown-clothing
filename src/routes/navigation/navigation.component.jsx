import { Fragment } from "react"
import { Outlet } from "react-router-dom"
import { selectIsCartOpen } from "../../store/cart/cart.selector"
import { selectCurrentUser } from "../../store/user/user.selector"
import {ReactComponent as CrownLogo} from '../../assets/crown.svg'
import CartIcon from "../../components/cart-icon/cart-icon.component"
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component"
import { signOutUser } from "../../utils/firebase/firebase.utils"
import {useSelector} from 'react-redux'

import {NavLink, LogoContainer, NavLinks, NavigationContainer} from './navigation.styles.jsx'

const Navigation = () => {

  const currentUser = useSelector(selectCurrentUser)
  const isCartOpen = useSelector(selectIsCartOpen)

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
            {
            currentUser ? 
            <NavLink as="span" onClick={signOutUser} className="nav-link">SIGN OUT</NavLink> : 
            <NavLink className="nav-link" to="/auth">
                SIGN IN
            </NavLink>
            }
            <CartIcon/>
          </NavLinks>
          {isCartOpen && <CartDropdown/>}
        </NavigationContainer>
        <Outlet/>
      </Fragment>
    )
}

export default Navigation