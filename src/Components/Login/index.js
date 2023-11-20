import React, { useState } from "react";
import "./index.css";
import { CallPostApi, InistalFetchingStatus } from "../Utilits";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

const Login = (props) => {
  const [fetchState, setFetchState] = useState(InistalFetchingStatus.INITIAL);
  const [userNameInput, setUserNameInput] = useState("");
  const [userPasswordInput, setUserPasswordInput] = useState("");
  const [apiErrorMsg, setApiErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const submitForm = async (event) => {
    event.preventDefault();
    try {
      setFetchState(InistalFetchingStatus.INPROGRESS);
      const path = "login";
      const bodyData = { username: userNameInput, password: userPasswordInput };
      const ApiData = await CallPostApi(path, bodyData);
      const token = ApiData.jwt_token;
      Cookies.set("jwt_token", token, { expires: 30 });
      const { history } = props;
      history.replace("/");
      setFetchState(InistalFetchingStatus.SUCCESS);
    } catch (error) {
      setFetchState(InistalFetchingStatus.FAILURE);
      setApiErrorMsg(error.message);
    }
  };

  const changeUserInputName = (event) => {
    setUserNameInput(event.target.value);
  };

  const changeUserInputPassword = (event) => {
    setUserPasswordInput(event.target.value);
  };

  const togglePassword = (event) => {
    setShowPassword(event.target.checked);
  };

  const token = Cookies.get("jwt_token");

  if (token !== undefined) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12  d-flex flex-column flex-lg-row align-items-center justify-content-center justify-content-lg-between login-page">
          <div className="col-lg-5 d-none d-lg-block">
            <img
              src="https://res.cloudinary.com/dnmaskg3n/image/upload/v1674805961/Layer_2_d2m8jk.png"
              alt="login-lg-banner"
              className="img-fluid"
            />
          </div>
          <div className="col-12 col-md-8 col-lg-5 form-container">
            <div className="text-center mb-5">
              <img
                src="https://res.cloudinary.com/dnmaskg3n/image/upload/v1674705428/Standard_Collection_8_otzjni.png"
                alt="login-form-logo"
                className="img-fluid mb-3"
              />
              <h1 className="login-logo-text">Insta Share</h1>
            </div>
            <form onSubmit={submitForm}>
              <div className="mb-3">
                <label htmlFor="userName" className="form-label">
                  User Name
                </label>
                <input
                  type="text"
                  placeholder="Enter User Name"
                  id="userName"
                  className="form-control"
                  value={userNameInput}
                  onChange={changeUserInputName}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  id="password"
                  className="form-control"
                  value={userPasswordInput}
                  onChange={changeUserInputPassword}
                />
              </div>
              <div className="mb-3 form-check form-switch">
                <input
                  type="checkbox"
                  id="check"
                  className="form-check-input"
                  onClick={togglePassword}
                />
                <label htmlFor="check" className="form-label ms-2">
                  Show Password
                </label>
              </div>
              <div className="d-grid mb-3">
                <button type="submit" className="btn btn-lg btn-primary">
                  {fetchState === InistalFetchingStatus.INPROGRESS
                    ? "Loading Pls Wait...."
                    : "Login"}
                </button>
              </div>
              {fetchState === InistalFetchingStatus.FAILURE && (
                <div className="alert alert-danger">
                  <small>{apiErrorMsg}</small>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
