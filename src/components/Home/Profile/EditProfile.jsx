import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { FaUpload } from "react-icons/fa";
import { v4 as uuid } from "uuid";
import "../../../styles/profile.css";
import { IoIosCamera } from "react-icons/io";

const EditProfile = () => {
  const [img, setImg] = useState(null);
  const [coverImg, setCoverImg] = useState(null); // New state for cover image
  const [error, setError] = useState("");
  const [data, setData] = useState({
    name: "",
    email: "",
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
    const expertiseArray = data.expertise
      ? data.expertise.split(",").map((item) => item.trim())
      : [];
    const fluentInArray = data.fluentIn
      ? data.fluentIn.split(",").map((item) => item.trim())
      : [];

    // Function to upload an image and return its download URL
    const uploadImage = async (image) => {
      const storageRef = ref(storage, "usersImages/" + uuid());
      const uploadTask = uploadBytesResumable(storageRef, image);
      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          null,
          (error) => {
            setError("Error uploading image: " + error.message);
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

    try {
      // Upload profile image if it exists
      if (img) {
        photoURL = await uploadImage(img);
      }

      // Upload cover image if it exists
      if (coverImg) {
        coverPhotoURL = await uploadImage(coverImg);
      }

      // Update profile with the new data if provided
      await updateProfile(currentUser, {
        displayName: data.name || currentUser.displayName,
        photoURL: photoURL || currentUser.photoURL,
        coverPhotoURL: coverPhotoURL || currentUser.coverPhotoURL,
        email: data.email || currentUser.email,
      });

      // Update Firestore with new user data if provided
      await setDoc(doc(db, "users", currentUser.uid), {
        uid: currentUser.uid,
        photoURL: photoURL || currentUser.photoURL,
        coverPhotoURL: coverPhotoURL || currentUser.coverPhotoURL,
        displayName: data.name || currentUser.displayName,
        email: data.email || currentUser.email,
        bio: data.bio || currentUser.bio,
        about: data.about || currentUser.about,
        expertise: expertiseArray.length
          ? expertiseArray
          : currentUser.expertise,
        fluentIn: fluentInArray.length ? fluentInArray : currentUser.fluentIn,
        createdAt: serverTimestamp(),
      });
      
      navigate("/");
    } catch (err) {
      console.error("Error updating profile: ", err);
      setError("Error updating profile: " + err.message);
    }
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
                src={
                  currentUser.photoURL || "https://default-profile-img-url.com"
                }
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
                      Image: <FaUpload className="icon" />
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
                      placeholder="Your new Name"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="formInput">
                    <label>Bio</label>
                    <input
                      type="text"
                      name="bio"
                      placeholder="Bio"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="formInput">
                    <label>About</label>
                    <input
                      type="text"
                      placeholder="Describe yourself"
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
                      placeholder="Enter your languages"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="formInput">
                    <label>Password</label>
                    <input
                      type="password"
                      name="oldPassword"
                      placeholder="Enter your old password"
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
