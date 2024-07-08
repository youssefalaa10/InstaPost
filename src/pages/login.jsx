// LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient";
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
    const { data, error } = await SupabaseAuthClient.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (error) {
      console.error("Error signing in:", error.message);
      return;
    }

    localStorage.setItem("token", data.session.access_token);
    navigate("/");
  };

  return (
    <div className="container">
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
                  <input type="checkbox" className="mt-3" />
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
                <a href="#" onClick={() => setIsLogin(false)}>
                  Sign up
                </a>
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

// function LoginPage() {
//   const navigate = useNavigate();
//   const [isLogin, setIsLogin] = useState(true);
//   const [form, setForm] = useState({
//     username: '',
//     password: '',
//   });

//   const handleChange = (event) => {
//     setForm({
//       ...form,
//       [event.target.name]: event.target.value,
//     });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const login = async () => {
//       const { data } = await axiosInstance.post('auth/login', form);
//       localStorage.setItem('token', data.data.token);
//       navigate('/');
//     };
//     login();
//   };

//   return (
//     <div className="container">
//       <div className="login-container">
//         <div className="login-form">
//           {isLogin ? (
//             <form onSubmit={handleSubmit}>
//               <h2>Login</h2>
//               <label htmlFor="email">Email</label>
//               <input type="text" id="email" placeholder="Email" name="username" value={form.username} onChange={handleChange} />
//               <label htmlFor="password">Password</label>
//               <input type="password" id="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
//               <div className="options">
//                 <div className="flex flex-start items-center gap-2">
//                   <input type="checkbox" className="mt-3" />
//                   <label htmlFor="remember" className="remember text-nowrap text-sm text-gray-500">Remember me</label>
//                 </div>
//                 <a href="#">Forgot Password?</a>
//               </div>
//               <button type="submit">Login</button>
//               <p>
//                 Don’t have an account yet? <a href="#" onClick={() => setIsLogin(false)}>Sign up</a>
//               </p>
//             </form>
//           ) : (
//             <RegisterPage onLoginClick={() => setIsLogin(true)} />
//           )}
//         </div>
//         <div className="login-welcome">
//           <h2>Welcome Back!</h2>
//           <p>To keep connected with us, please login with your personal info.</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LoginPage;
