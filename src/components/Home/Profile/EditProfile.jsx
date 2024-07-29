import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
  updateProfile,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { FaImages, FaUpload } from "react-icons/fa6";
import { v4 as uuid } from "uuid";
import "../../../styles/profile.css";
const EditProfile = () => {
  const [img, setImg] = useState(null);
  const [error, setError] = useState(false);
  const [data, setData] = useState({
    name: "",
    newEmail: "",
    phone: "",
    age: "",
    country: "",
    relationship: "",
    oldPassword: "",
  });
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (img) {
      const storageRef = ref(storage, "usersImages/" + uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          setError(true);
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(currentUser, {
              displayName: data.name,
              email: data.newEmail,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "users", currentUser.uid), {
              uid: currentUser.uid,
              photoURL: downloadURL,
              displayName: data.name,
              email: data.newEmail,
              phone: data.phone,
              age: data.age,
              country: data.country,
              relationship: data.relationship,
              createdAt: serverTimestamp(),
            });

            const credential = EmailAuthProvider.credential(
              currentUser.email,
              data.oldPassword
            );

            await reauthenticateWithCredential(currentUser, credential).then(
              async () => {
                //User reauthenticate
                await updateEmail(currentUser, data.newEmail);
              }
            );
          });
        }
      );
    } else {
      await updateProfile(currentUser, {
        displayName: data.name,
        email: data.newEmail,
      });

      await setDoc(doc(db, "users", currentUser.uid), {
        uid: currentUser.uid,

        displayName: data.name,
        email: data.newEmail,
        phone: data.phone,
        age: data.age,
        country: data.country,
        relationship: data.relationship,
        createdAt: serverTimestamp(),
      });

      const credential = EmailAuthProvider.credential(
        currentUser.email,
        data.oldPassword
      );

      await reauthenticateWithCredential(currentUser, credential).then(
        async () => {
          //User reauthenticate
          await updateEmail(currentUser, data.newEmail);
        }
      );
    }
    navigate("/login");
  };
  console.log(error);
  return (
    <div className="editProfile">
      <div className="editProfileWrapper">
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src="/assets/profileCover/profilecover.jpg"
                alt=""
                className="profileCoverImg"
              />
              <img
                src={currentUser.photoURL}
                alt=""
                className="profileUserImg"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{currentUser.displayName}</h4>
              <span className="profileInfoDesc">Hi Friends!</span>
            </div>
          </div>
          <div className="editprofileRightBottom">
            <div className="top">
              <h1>Edit User Profile</h1>
            </div>
            <div className="bottom">
              <div className="left flex">
                <img
                  src={
                    img
                      ? URL.createObjectURL(img)
                      : "/assets/profileCover/DefaultProfile.jpg"
                  }
                  alt=""
                />
              </div>
              <div className="right">
                <form onSubmit={handleUpdate}>
                  <div className="formInput">
                    <label htmlFor="file">
                      Image: <FaUpload className="icon " />
                    </label>
                    <input
                      type="file"
                      id="file"
                      style={{ display: "none" }}
                      onChange={(e) => setImg(e.target.files[0])}
                    />
                    <label
                      htmlFor="imageFile"
                      className="flex flex-col items-center justify-center   border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 border-gray-300"
                    >
                      {img ? (
                        <img
                          src={URL.createObjectURL(img)}
                          alt="Selected"
                          className=" object-contain"
                        />
                      ) : (
                        <>
                          <FaImages className="w-10 h-10 text-gray-400" />
                          <p className="text-sm text-gray-500">
                            Click to upload or drag and drop
                          </p>
                        </>
                      )}
                    </label>
                  </div>
                  <div className="formInput">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Jane Doe"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="formInput">
                    <label>Email</label>
                    <input
                      type="email"
                      name="newEmail"
                      placeholder="jane_doe@gmail.com"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="formInput">
                    <label>Phone</label>
                    <input
                      type="text"
                      name="phone"
                      placeholder="+4 123 456 789"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="formInput">
                    <label>Age</label>
                    <input
                      type="text"
                      placeholder="Enter Your Age"
                      name="age"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="formInput">
                    <label>Country</label>
                    <input
                      type="text"
                      name="country"
                      placeholder="United Kingdom"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="formInput">
                    <label>Relationship</label>
                    <input
                      type="text"
                      name="relationship"
                      placeholder="Enter Your Status"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="formInput">
                    <label>Password</label>
                    <input
                      type="password"
                      name="oldPassword"
                      placeholder="Enter Your Old Password"
                      onChange={handleChange}
                    />
                  </div>
                  <button type="submit" className="updateButton">
                    Update Profile
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
