import "./Login.css";
import { UserContext } from "../../UserContext";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import React, { useState, useContext } from "react";

export const Login = () => {
  const { userState, userActions } = useContext(UserContext);
  const [show, setShow] = useState(false);
  console.log(show);
  return (
    <div className="register">
      <div className="register-all">
        <h1>Login</h1>
        <form onSubmit={userActions.handleSubmitLogin}>
          <div className="email">
            <label>Email</label>
            <input
              type="text"
              placeholder="Enter your Email"
              onChange={(e) => userActions.setEmail(e.target.value)}
              value={userState.email}
              className={userState.errorEmail ? "error" : ""}
            />
          </div>

          <div className={"password"}>
            <label>Password</label>

            <input
              type={show ? "text" : "password"}
              placeholder="Enter your Password"
              onChange={(e) => userActions.setPassword(e.target.value)}
              value={userState.password}
              className={userState.errorPassword ? "error" : ""}
            />
            {show ? (
              <IoMdEye onClick={() => setShow(false)} />
            ) : (
              <IoMdEyeOff onClick={() => setShow(true)} />
            )}
          </div>

          <div className="rememberMe">
            <div>
              <label>Remember me </label>
              <input type="checkbox" className="remember" />
            </div>

            <a href="/forgetpass">Forgot Password?</a>
          </div>

          <button type={"submit"}>Login</button>
          {/* <a href="">Back</a> */}
        </form>
        <div className="signin">
          <p>
            Don’t have an account ? <a href="/register">Sign Up</a>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};
