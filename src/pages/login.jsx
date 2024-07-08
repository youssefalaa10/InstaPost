import { Link , useNavigate } from "react-router-dom";
import "../styles/login.css";
import { useState } from "react";
import axiosInstance from "../api";


function LoginPage() {
  const navigate = useNavigate();
 
const [form, setForm] = useState({
  // super slam :)
  username: "support@zainseeds.com",
  password: "zain#123456789#",
});

const handleChange =(event) => {
  setForm({
    ...form,
    [event.target.name]: event.target.value,
  });
}

const handleSubmit = (event) => {
  event.preventDefault();
  const login = async () => {
    const {data} = await axiosInstance.post("auth/login", form);
    localStorage.setItem("token", data.data.token);
    navigate("/");
  }
  login();
};


  return (
    <div className="container">
      <div className="login-container">
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" placeholder="Email" name="username" value={form.username} onChange={handleChange}/>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Password" value={form.password} onChange={handleChange}/>
            <div className="options ">
              <div className="flex flex-start items-center gap-2">
                <input type="checkbox" className="mt-3" />
                <label
                  htmlFor="remember "
                  className="remember text-nowrap text-sm text-gray-500"
                >
                  Remember me
                </label>
              </div>

              <a href="#">Forgot Password?</a>
            </div>
            <button type="submit">Login</button>
            <p>
              Don t have an account yet? <Link href="#">Sign up</Link>
            </p>
          </form>
        </div>
        <div className="login-welcome">
          <h2>Welcome Back!</h2>
          <p>
            To keep connected with us, please login with your personal info.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

/*

import '../styles/login.css';

function LoginPage() {
   
     return (
        <div className="container">
            <div className="login-container">
                <div className="login-form">
                    <div className="tabs">
                        <div
                            className={`tab ${isLogin ? 'active' : ''}`}
                            onClick={() => setIsLogin(true)}
                        >
                            Login
                        </div>
                        <div
                            className={`tab ${!isLogin ? 'active' : ''}`}
                            onClick={() => setIsLogin(false)}
                        >
                            Register
                        </div>
                    </div>
                    {isLogin ? (
                        <form>
                            <h2>Login</h2>
                            <label htmlFor="username">Email</label>
                            <input type="text" id="username" placeholder="Email" />
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" placeholder="Password" />
                            <div className="options">
                                <label>
                                    <input type="checkbox" /> Remember me
                                </label>
                                <a href="#">Forgot Password?</a>
                            </div>
                            <button type="submit">Login</button>
                            <p>Don t have an account yet? <a href="#" onClick={() => setIsLogin(false)}>Sign up</a></p>
                        </form>
                    ) : (
                        <form>
                            <h2>Register</h2>
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" placeholder="Name" />
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" placeholder="Email" />
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" placeholder="Password" />
                            <button type="submit">Register</button>
                            <p>Already have an account? <a href="#" onClick={() => setIsLogin(true)}>Login</a></p>
                        </form>
                    )}
                </div>
                <div className="login-welcome">
                    <h2>Welcome Back!</h2>
                    <p>To keep connected with us, please login with your personal info.</p>
                </div>
            </div>
        </div>
    );
}


export default LoginPage;




*/
