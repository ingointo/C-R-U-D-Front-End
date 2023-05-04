import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(()=> {
    sessionStorage.clear();
  },[])

  const proceedLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      axios
        .get(`http://localhost:3000/users/${username}`)
        .then((res) => {
          if (res.data.password === password) {
              navigate("/");
              toast.success("Success");
              sessionStorage.setItem('username', username)
          } else {
            toast.error("Please Enter valid Credential");
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 404) {
            toast.error("Please enter valid username");
          } else {
            toast.error(`Login Failed due to: ${err.message}`);
          }
        });
    }
  };
  const validate = () => {
    let result = true;
    if (username === "" || username === null) {
      result = false;
      toast.warning("Pleaser Enter User Name");
    }
    if (password === "" || password === null) {
      result = false;
      toast.warning("Pleaser Enter Password");
    }
    return result;
  };

  return (
    <div className="row">
      <div className="offset-lg-3 col-lg-6 mt-5">
        <form onSubmit={proceedLogin}>
          <div className="card-header">
            <h2>User Login</h2>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label htmlFor="username">
                User Name <span className="errmsg"></span>
              </label>
              <input
                className="form-control"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">
                Password <span className="errmsg"></span>
              </label>
              <input
                className="form-control"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="card-footer mt-2">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
              <Link className="btn btn-success ms-2" to={"/signup"}>
                Register
              </Link>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
