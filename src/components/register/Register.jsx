import React, { useContext,useState } from "react";
import "./Register.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./../../UserContext";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";


export const Register = () => {
  const { userState, userActions } = useContext(UserContext);
const [show, setShow] = useState(false);

  return (
    <div className="register">
      <div className="register-all">
        <h1>Create An  Account</h1>
        <form onSubmit={userActions.handleSubmit}>
          <div className="name">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter youre name"
              onChange={(e) => userActions.setName(e.target.value)}
              value={userState.username}
              className={userState.errorName?'error':''}

            />
          </div>
          <div className="email">
            <label>Email</label>
            <input
              type="text"
              placeholder="Enter your Email"
              onChange={(e) => userActions.setEmail(e.target.value)}
              value={userState.email}
              className={userState.errorEmail?'error':''}

            />
          </div>
          <div className="phone">
            <label>Phone Number <small>Format: 094-55-55-55</small></label>
            <input
              type="tel"
              placeholder=" 094-55-55-55"
              // pattern="[0-9]{3}[0-9]{3}[0-9]{3}"
              onChange={(e) => userActions.setPhone(e.target.value)}
              value={(userState.phone)}
              className={userState.errorPhone?'error':''}

            />
          </div>
          <div className={"password"}>
          <label>Password</label>

            <input
              type={show?'text':'password'}
              placeholder="Enter your Password"
              onChange={(e) => userActions.setPassword(e.target.value)}
              value={userState.password}
              className={userState.errorPassword?'error':''}
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
              className={userState.errorComfirmPassword?'error':''}


            />

            
          </div>

          <button type={"submit"}>Sign Up</button>
          {/* <a href="">Back</a> */}
        </form>
        <div className="signin">
          <p>Don’t have an account ? <a href="/login">Sign In</a> </p>
        </div>
      </div>
    </div>
  );
};
