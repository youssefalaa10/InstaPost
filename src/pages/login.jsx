// LoginPage.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";
import RegisterPage from "./Register";


function LoginPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  

    navigate("/");
  };

  return (
    <div className="contain mx-auto">
      <div className="login-container">
        <div className="login-form">
          {isLogin ? (
            <form onSubmit={handleSubmit}>
              <h2>Login</h2>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                placeholder="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
              />
              <div className="options">
                <div className="flex flex-start items-center gap-2">
                  <input type="checkbox" className="mt-3" id="remember" />
                  <label
                    htmlFor="remember"
                    className="remember text-nowrap text-sm text-gray-500"
                  >
                    Remember me
                  </label>
                </div>
                <a href="#">Forgot Password?</a>
              </div>
              <button type="submit">Login</button>
              <p>
                Don’t have an account yet?{" "}
                <Link to="/register" onClick={() => setIsLogin(false)}>
                  Sign up
                </Link>
              </p>
            </form>
          ) : (
            <RegisterPage onLoginClick={() => setIsLogin(true)} />
          )}
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

