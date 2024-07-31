import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { TbLoader3 } from "react-icons/tb";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../styles/login.css";

function RegisterPage({ onLoginClick }) {
  const [img, setImg] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true); // Start loading
    const { username, email, password } = values;
    const defaultImageURL =
      "https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg";

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);

      if (img) {
        const storageRef = ref(storage, "usersImages/" + username);
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
                displayName: username,
                photoURL: downloadURL,
              });
              await setDoc(doc(db, "users", result.user.uid), {
                uid: result.user.uid,
                username,
                email,
                photoURL: downloadURL,
              });
              await setDoc(doc(db, "usersPosts", result.user.uid), {
                messages: [],
              });
              setIsLoading(false); // End loading
              navigate("/");
            } catch (error) {
              setError(true);
              setIsLoading(false); // End loading on error
            }
          }
        );
      } else {
        await updateProfile(result.user, {
          displayName: username,
          photoURL: defaultImageURL,
        });
        await setDoc(doc(db, "users", result.user.uid), {
          uid: result.user.uid,
          username,
          email,
          photoURL: defaultImageURL,
        });
        await setDoc(doc(db, "usersPosts", result.user.uid), {
          messages: [],
        });
        setIsLoading(false); // End loading
        navigate("/");
      }
    } catch (error) {
      setError(true);
      setIsLoading(false); // End loading on error
    }
    setSubmitting(false);
  };

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
          <p>To keep connected with us, please login with your personal info.</p>
          <Link to={"/"}>
            <button className="guest-button">Continue as Guest</button>
          </Link>
        </div>
        <div className="login-form">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
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
                <Field
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                />
                <ErrorMessage name="username" component="div" className="error" />
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
                <ErrorMessage name="password" component="div" className="error" />
                <button type="submit" disabled={isSubmitting}>
                  Register
                </button>
                <p>
                  Already have an account?{" "}
                  <Link to={"/login"} onClick={onLoginClick}>
                    Login
                  </Link>
                </p>
                {error && <span>Something went wrong</span>}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
