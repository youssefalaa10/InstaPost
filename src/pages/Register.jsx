import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../firebase";

import "../styles/login.css";
import { doc, setDoc } from "firebase/firestore";

function RegisterPage({ onLoginClick }) {
  const [img, setImg] = useState(null);
  const [error, setError] = useState(false);
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
    const userName = e.target[1].value;
    const email = e.target[2].value;
    const password = e.target[3].value;
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const storageRef = ref(storage, "usersImages/" + userName);

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          // Handle unsuccessful uploads
          setError(true);
          console.error("Upload failed", error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await updateProfile(result.user, {
              displayName: userName, // Changed to displayName
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", result.user.uid), {
              // Ensure collection name 'users' is used
              uid: result.user.uid,
              userName,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "usersPosts", result.user.uid), {
              messages: [],
            });
          } catch (error) {
            setError(true);
          }
        }
      );
    } catch (error) {
      setError(true);
    }
    navigate("/login");
  }

  return (
    <div className="contain mx-auto">
      <div className="login-container">
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-between">
              <h2>Register</h2>
              <div className="image-profile">
                <label htmlFor="profile-img">
                  <img
                    className="profile-img"
                    src={
                      img
                        ? URL.createObjectURL(img)
                        : "src/assets/images/profile.jpg"
                    }
                    alt="profile"
                  />
                </label>
                <input
                  type="file"
                  name="image"
                  id="profile-img"
                  onChange={(e) => setImg(e.target.files[0])}
                  accept=".png,.jpeg,.jpg"
                />
              </div>
            </div>
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
              minLength={6}
              value={form.password}
              onChange={handleChange}
            />
            <button type="submit">Register</button>
            <p>
              Already have an account?{" "}
              <Link to={"/login"} onClick={onLoginClick}>
                Login
              </Link>
            </p>
          </form>
          {error && <span>Something went wrong</span>}
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

export default RegisterPage;
