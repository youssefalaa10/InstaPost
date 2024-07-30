import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { TbLoader3 } from "react-icons/tb";

import "../styles/login.css";

function RegisterPage({ onLoginClick }) {
  const [img, setImg] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true); // Start loading
    const userName = e.target[1].value;
    const email = e.target[2].value;
    const password = e.target[3].value;
    const defaultImageURL =
      "https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg";

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (img) {
        const storageRef = ref(storage, "usersImages/" + userName);
        const uploadTask = uploadBytesResumable(storageRef, img);

        uploadTask.on(
          "state_changed",
          null,
          (error) => {
            setError(true);
            console.error("Upload failed", error);
            setIsLoading(false); // End loading on error
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              await updateProfile(result.user, {
                displayName: userName,
                photoURL: downloadURL,
              });
              await setDoc(doc(db, "users", result.user.uid), {
                uid: result.user.uid,
                userName,
                email,
                photoURL: downloadURL,
              });
              await setDoc(doc(db, "usersPosts", result.user.uid), {
                messages: [],
              });
              setIsLoading(false); // End loading
            } catch (error) {
              setError(true);
              setIsLoading(false); // End loading on error
            }
          }
        );
      } else {
        await updateProfile(result.user, {
          displayName: userName,
          photoURL: defaultImageURL,
        });
        await setDoc(doc(db, "users", result.user.uid), {
          uid: result.user.uid,
          userName,
          email,
          photoURL: defaultImageURL,
        });
        await setDoc(doc(db, "usersPosts", result.user.uid), {
          messages: [],
        });
        setIsLoading(false); // End loading
      }
    } catch (error) {
      setError(true);
      setIsLoading(false); // End loading on error
    }
    navigate("/");
  }

  return (
    <div className="contain mx-auto">
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50">
          <TbLoader3 className="animate-spin text-4xl text-blue-500" />
        </div>
      )}
      <div className="login-container">
        <div className="login-welcome">
          <h2>Welcome Back!</h2>
          <p>
            To keep connected with us, please login with your personal info.
          </p>
          <Link to={"/"}>
            <button className="guest-button">Continue as Guest</button>
          </Link>
        </div>
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
                        : "https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
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
      </div>
    </div>
  );
}

export default RegisterPage;
