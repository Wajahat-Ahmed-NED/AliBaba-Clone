import React, { useState } from "react";
import "./header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";

function Header() {
  const [{ basket ,user} , dispatch] = useStateValue();
  const handleAuth =()=>{
    if (user) {
      auth.signOut();
    }
  }
  return (
    <div className="header">
      <Link to="/">
        <img
          src="https://pngimg.com/uploads/amazon/amazon_PNG25.png"
          className="header_logo"
        />
      </Link>

      <div className="header_search">
        <input type="text" className="header_searchInput" />
        <SearchIcon className="header_searchIcon" />
      </div>

      <div className="header_nav">
        <Link to={!user &&"/login"}>
        <div onClick={handleAuth} className="header_option">
  <span className="header_optionLineone">Hello {user ? user.email : 'Guest' }</span>
          <span className="header_optionLinetwo">{user?'Signout':'Sign In'}</span>
        </div>
        </Link>

        <Link to="/orders">
        <div className="header_option">
          <span className="header_optionLineone">Return</span>
          <span className="header_optionLinetwo">& Orders</span>
        </div>
        </Link>

        <div className="header_option">
          <span className="header_optionLineone">Your </span>
          <span className="header_optionLinetwo">Prime</span>
        </div>

        <Link to="/checkout">
          <div className="header_optionBasket">
            <ShoppingBasketIcon />
            <span className="header_optionLinetwo header_Basketcount">
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
