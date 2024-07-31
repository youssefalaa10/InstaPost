import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../styles/login.css";
import RegisterPage from "./Register";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      navigate("/", { replace: true });
    } catch (error) {
      setError(true);
    }
    setSubmitting(false);
  };

  return (
    <div className="contain mx-auto">
      <div className="login-container">
        <div className="login-welcome">
          <h2>Welcome Back!</h2>
          <p>To keep connected with us, please login with your personal info.</p>
          <Link to={"/"}>
            <button className="guest-button">Continue as Guest</button>
          </Link>
        </div>
        <div className="login-form">
          {isLogin ? (
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <h2>Login</h2>
                  <label htmlFor="email">Email</label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                  />
                  <ErrorMessage name="email" component="div" className="error" />
                  <label htmlFor="password">Password</label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    minLength={6}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error"
                  />
                  <div className="options">
                    <div className="flex flex-start items-center gap-2">
                      <Field type="checkbox" className="mt-3" id="remember" />
                      <label
                        htmlFor="remember"
                        className="remember text-nowrap text-sm text-gray-500"
                      >
                        Remember me
                      </label>
                    </div>
                    <a href="#">Forgot Password?</a>
                  </div>
                  <button type="submit" disabled={isSubmitting}>
                    Login
                  </button>
                  <p>
                    Don’t have an account yet?{" "}
                    <Link to="/register" onClick={() => setIsLogin(false)}>
                      Sign up
                    </Link>
                  </p>
                  {error && <p>Something went wrong</p>}
                </Form>
              )}
            </Formik>
          ) : (
            <RegisterPage onLoginClick={() => setIsLogin(true)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
