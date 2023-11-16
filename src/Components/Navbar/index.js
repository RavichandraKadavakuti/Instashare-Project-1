import React, { useState, useContext } from "react";
import "./index.css";
import {
  NavLink,
  Link,
  withRouter,
} from "react-router-dom/cjs/react-router-dom.min";
import Context from "../../Context";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Cookies from "js-cookie";

const Navbar = (props) => {
  const { searchInputValue, onchangeSerachInputValue } = useContext(Context);

  const [showSearchBox, setShowSearchBox] = useState(false);

  const toggleSearchBar = () => {
    setShowSearchBox(!showSearchBox);
  };

  const onchangeSearch = (event) => {
    onchangeSerachInputValue(event.target.value);
  };

  const onLogout = () => {
    Cookies.remove("jwt_token");
    const { history } = props;
    history.replace("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary  mb-3 mb-lg-5">
        <div className="container">
          <Link to="/">
            <div className="d-flex align-items-center">
              <img
                src="https://res.cloudinary.com/dnmaskg3n/image/upload/v1674705428/Standard_Collection_8_otzjni.png"
                alt="navbar-logo"
                className="navbar-brand nav-logo"
              />
              <h6 className="navbar-brand navbar-text">Insta Share</h6>
            </div>
          </Link>
          <button
            type="button"
            className="navbar-toggler shadow-none border-0 bg-transparent"
            data-bs-toggle="collapse"
            data-bs-target="#navItems"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse my-3 d-lg-flex justify-content-end"
            id="navItems"
          >
            <ul className="navbar-nav d-lg-flex align-items-lg-center">
              <li className="d-none d-lg-block me-3">
                <input
                  type="search"
                  placeholder="Search Caption"
                  className="form-control"
                  value={searchInputValue}
                  onChange={onchangeSearch}
                />
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/"
                  className="nav-link"
                  activeClassName="active"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink exact to="/profile" className="nav-link">
                  Profile
                </NavLink>
              </li>

              <li className="nav-item nav-link d-lg-none">
                <button
                  type="button"
                  className="btn btn-primary btn-border"
                  onClick={toggleSearchBar}
                >
                  Search
                </button>
              </li>
              <li className="nav-item nav-link">
                <Popup
                  modal
                  closeOnDocumentClick={false}
                  trigger={
                    <button className="button btn btn-primary">Logout</button>
                  }
                >
                  {(close) => (
                    <div className="d-flex flex-column justify-content-center align-items-center">
                      <h6>Please Confirm</h6>
                      <div className="d-flex justify-content-around my-3">
                        <button
                          type="button"
                          className="btn btn-primary me-3"
                          onClick={onLogout}
                        >
                          Logout
                        </button>
                        <button
                          type="button"
                          className="btn btn-warning"
                          onClick={close}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                </Popup>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {showSearchBox && (
        <div className="d-flex justify-content-between align-items-center my-3 sm-search-box mx-auto d-lg-none">
          <input
            type="search"
            placeholder="Search Caption"
            className="form-control"
            value={searchInputValue}
            onChange={onchangeSearch}
          />
        </div>
      )}
    </>
  );
};

export default withRouter(Navbar);
