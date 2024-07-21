// LoginPage.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";
import RegisterPage from "./Register";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
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

    const email = event.target[0].value;
    const password = event.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="contain mx-auto">
      <div className="login-container">
        <div className="login-welcome">
          <h2>Welcome Back!</h2>
          <p>
            To keep connected with us, please login with your personal info.
          </p>
        </div>
        <div className="login-form">
          {isLogin ? (
            <form onSubmit={handleSubmit}>
              <h2>Login</h2>
              <label htmlFor="email">Email</label>
              <input
                type="email"
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
                minLength={6}
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
              {error && <p>Somthing went wrong</p>}
            </form>
          ) : (
            <RegisterPage onLoginClick={() => setIsLogin(true)} />
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
