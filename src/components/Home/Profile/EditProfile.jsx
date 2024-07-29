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
import { FaUpload } from "react-icons/fa6";
import { v4 as uuid } from "uuid";
import "../../../styles/profile.css";
import { IoIosCamera } from "react-icons/io";

const EditProfile = () => {
  const [img, setImg] = useState(null);
  const [coverImg, setCoverImg] = useState(null); // New state for cover image
  const [error, setError] = useState(false);
  const [data, setData] = useState({
    name: "",
    newEmail: "",
    bio: "",
    about: "",
    expertise: "",
    fluentIn: "",
    oldPassword: "",
  });
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Convert expertise and fluentIn to arrays of strings
    const expertiseArray = data.expertise.split(",").map((item) => item.trim());
    const fluentInArray = data.fluentIn.split(",").map((item) => item.trim());

    // Function to upload an image and return its download URL
    const uploadImage = async (image) => {
      const storageRef = ref(storage, "usersImages/" + uuid());
      const uploadTask = uploadBytesResumable(storageRef, image);
      return new Promise((resolve, reject) => {
        uploadTask.on(
          (error) => {
            setError(true);
            console.log(error);
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(resolve).catch(reject);
          }
        );
      });
    };

    let photoURL = currentUser.photoURL;
    let coverPhotoURL = currentUser.coverPhotoURL;

    // Upload profile image if it exists
    if (img) {
      photoURL = await uploadImage(img);
    }

    // Upload cover image if it exists
    if (coverImg) {
      coverPhotoURL = await uploadImage(coverImg);
    }

    await updateProfile(currentUser, {
      displayName: data.name,
      photoURL: photoURL,
      coverPhotoURL: coverPhotoURL,
    });

    await setDoc(doc(db, "users", currentUser.uid), {
      uid: currentUser.uid,
      photoURL: photoURL,
      coverPhotoURL: coverPhotoURL,
      displayName: data.name,
      email: currentUser.email,
      bio: data.bio,
      about: data.about,
      expertise: expertiseArray,
      fluentIn: fluentInArray,
      createdAt: serverTimestamp(),
    });

    const credential = EmailAuthProvider.credential(
      currentUser.email,
      data.oldPassword
    );

    await reauthenticateWithCredential(currentUser, credential).then(
      async () => {
        // User reauthenticated
        await updateEmail(currentUser, data.newEmail);
      }
    );

    navigate("/");
  };
  console.log(error);
  return (
    <div className="editProfile">
      <div className="editProfileWrapper">
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src={
                  coverImg
                    ? URL.createObjectURL(coverImg)
                    : "https://givenow.com.au/img/default-cover.png"
                }
                alt=""
                className="profileCoverImg"
              />
              <div className="flex absolute bottom-20 left-20 bg-slate-100 rounded-md">
                <label
                  htmlFor="coverFile"
                  className="flex items-center space-x-2 p-2 cursor-pointer"
                >
                  <IoIosCamera className="icon text-lg" />
                  <span>Edit Cover Photo</span>
                </label>
                <input
                  type="file"
                  id="coverFile"
                  style={{ display: "none" }}
                  onChange={(e) => setCoverImg(e.target.files[0])}
                />
              </div>

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
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmhhs0F4iQ6BXiXB7DhqCKUhND_YbbUR_CdA&s"
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
                    <label>Bio</label>
                    <input
                      type="text"
                      name="bio"
                      placeholder="bio"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="formInput">
                    <label>About</label>
                    <input
                      type="text"
                      placeholder="describe your self"
                      name="about"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="formInput">
                    <label>Expertise</label>
                    <input
                      type="text"
                      name="expertise"
                      placeholder="Web development, UI/UX design, React/Flutter"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="formInput">
                    <label>Fluent In</label>
                    <input
                      type="text"
                      name="fluentIn"
                      placeholder="Enter Your languages"
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
