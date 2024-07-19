import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { supabase } from "../api/client.js";

function RegisterPage({ onLoginClick }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            username: form.username,
          },
        },
      });
      console.log(data);
      if (error) throw error;
      navigate("/");
      alert("Check your email for verification link");
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="register-form">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
        />
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
          placeholder="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        <button type="submit">Register</button>
        <p>
          Already have an account?{" "}
          <a href="#" onClick={onLoginClick}>
            Login
          </a>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
