// eslint-disable-next-line
import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";

const Login = () => {
  const [loginData, setloginData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = loginData;

  //OnChange function
  const onChange = (e) => {
    setloginData((prevState) => ({
      ...prevState, //get all the previous fields
      [e.target.name]: e.target.value, //updates the target input field
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login and start setting goals</p>
      </section>
      <section className="form">
        <form action="POST" onSubmit={onSubmit} className="login-control">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email eg. xyz@gmail.com"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="pwd"
              name="pwd"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
            />
          </div>

          <div className="login-group">
            <button type="submit" className="btn btn-block">
              Login
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
