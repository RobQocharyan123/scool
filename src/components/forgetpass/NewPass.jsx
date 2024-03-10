import React, { useContext, useState } from "react";
import { UserContext } from "./../../UserContext";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

export const NewPass = () => {
  const { userState, userActions } = useContext(UserContext);
  const [show, setShow] = useState(false);


  return (
    <div className="register">
      <div className="register-all">
        <h1>Forget Password?</h1>
        <p>Please check your email for create a new password</p>
        <form onSubmit={userActions.handleSubmitPasswords}>
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
          <div className="password">
            <label>Comfirm Password</label>
            <input
              type="password"
              placeholder="Enter your password again"
              onChange={(e) => userActions.setComfirmPassword(e.target.value)}
              value={userState.comfirmPassword}
              className={userState.errorComfirmPassword ? "error" : ""}
            />
          </div>

          <button type={"submit"}>Submit</button>
          {/* <a href="">Back</a> */}
        </form>
      </div>
    </div>
  );
};
