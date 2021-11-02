import { Button } from "@material-ui/core";
import React , {useState} from "react";
import { Link , useHistory } from "react-router-dom";
import { auth } from "./firebase";
import "./login.css";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    auth
        .signInWithEmailAndPassword(email,password)
        .then(auth=>{
          history.push('/')
        })
        .catch(error => alert(error.message))
  };

  const reg = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email,password) 
      .then((auth)=> {
          if (auth) {
            history.push('/')
          }
      })
      .catch(error => alert(error.message))
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login_image"
          src="https://pngimg.com/uploads/amazon/amazon_PNG21.png"
        />
      </Link>
      <div className="login_container">
        <h1>Sign-In</h1>
        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" onClick={signIn} className="login_signinbtn">
            Sign In
          </button>
        </form>
        <p>
          By continuing, you agree to Amazon's Conditions of Use and Privacy
          Notice.
        </p>
        <button onClick={reg} className="login_registerbtn">
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
}

export default Login;
