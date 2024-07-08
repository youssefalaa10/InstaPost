import "../styles/login.css";
function RegisterPage() {
  return (
    <div className="container">
      <div className="login-container">
        <div className="login-form">
          <form>
            <h2>Register</h2>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Name" />
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Email" />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Password" />
            <button type="submit">Register</button>
            <p>
              Already have an account?{" "}
              <a href="#" onClick={() => setIsLogin(true)}>
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
