import React from 'react';
import "./ForgetPass.css"
import { useContext } from 'react';
import { UserContext } from '../../UserContext';


export const ForgetPass = () => {
  const { userState, userActions } = useContext(UserContext);
  // Resubmit bazhiny arac chi

  return (
    <div className="register">
    <div className="register-all">
      <h1>Forget Password?</h1>
      <form onSubmit={userActions.handleSubmitForgetPass}>
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

    

      

        <button type={"submit"}>Get Email</button>
        {/* <a href="">Back</a> */}
      </form>
      <div className="signin">
        <p>
        Can’t get email ? <a href="#">Resubmit</a>{" "}
        </p>
      </div>
    </div>
  </div>
  )
}
