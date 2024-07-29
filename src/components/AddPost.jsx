import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { v4 as uuid } from "uuid";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";
import {
  addDoc,
  arrayUnion,
  collection,
  serverTimestamp,
  Timestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { FaImages } from "react-icons/fa6";
import { ImCancelCircle } from "react-icons/im";
import AddPostBtn from "./AddPostBtn";

function AddPost() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [hasTag, setHasTag] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState(null);
  const { currentUser } = useContext(AuthContext);

  const handleInputClick = () => setIsPopupVisible(true);
  const handleClosePopup = () => setIsPopupVisible(false);
  const handleFileChange = (e) => setImg(e.target.files[0]);
  const handleHasTagChange = (e) => setHasTag(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      uid: currentUser.uid,
      photoURL: currentUser.photoURL,
      userName: currentUser.displayName,
      description,
      hasTag,
      timestamp: serverTimestamp(),
    };

    const postDocRef = await addDoc(collection(db, "posts"), postData);
    await updateDoc(doc(db, "usersPosts", currentUser.uid), {
      messages: arrayUnion({
        ...postData,
        id: uuid(),
        timestamp: Timestamp.now(),
      }),
    });

    if (img) {
      const storageRef = ref(storage, `Posts/${uuid()}`);
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        "state_changed",
        null,
        (error) => console.error("Upload failed", error),
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await updateDoc(postDocRef, { img: downloadURL });
          await updateDoc(doc(db, "usersPosts", currentUser.uid), {
            messages: arrayUnion({
              ...postData,
              id: uuid(),
              img: downloadURL,
              timestamp: Timestamp.now(),
            }),
          });
        }
      );
    }

    setDescription("");
    setHasTag("");
    setImg(null);
    setIsPopupVisible(false);
  };

  const handleKey = (e) => {
    if (e.code === "Enter") handleSubmit(e);
  };

  const removeImage = () => {
    setImg(null);
  };

  return (
    <div>
      {currentUser && (
        <div className="w-full mt-1 mb-4 p-4 border rounded-lg shadow-sm bg-white">
          <div className="flex items-center mb-4">
            <img
              className="w-10 h-10 rounded-full"
              src={currentUser.photoURL}
              alt="User profile"
            />
            <input
              type="text"
              placeholder="What's on your mind ..."
              className="ml-4 w-full p-2 rounded-full border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleInputClick}
            />
          </div>
          {/* AddPostBtn component */}
          <div onClick={handleInputClick}>
            <AddPostBtn />
          </div>
        </div>
      )}

      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex justify-end">
              <button type="button" onClick={handleClosePopup}>
                <ImCancelCircle className="text-red-600 hover:text-red-800" />
              </button>
            </div>
            <h2 className="text-xl font-bold mb-4">Create Post</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Enter hashtag"
                  value={hasTag}
                  onChange={handleHasTagChange}
                />
              </div>
              <div className="mb-4">
                <textarea
                  className="w-full p-2 border rounded"
                  placeholder="Enter description"
                  value={description}
                  onChange={handleDescriptionChange}
                  onKeyDown={handleKey}
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Upload Image
                </label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="imageFile"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 border-gray-300"
                  >
                    {img ? (
                      <img
                        src={URL.createObjectURL(img)}
                        alt="Selected"
                        className="h-full w-full object-contain"
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
                  <input
                    id="imageFile"
                    type="file"
                    accept=".png,.jpeg,.jpg"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  {img && (
                    <button
                      type="button"
                      className="mt-2 text-red-600 hover:text-red-800"
                      onClick={removeImage}
                    >
                      <ImCancelCircle size={24} />
                    </button>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded w-full "
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddPost;
