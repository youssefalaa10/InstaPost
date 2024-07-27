import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { v4 as uuid } from "uuid";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";
import {
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { FaImages } from "react-icons/fa6";
import { ImCancelCircle } from "react-icons/im";

function EditPost({ post, onClose }) {
  const [hasTag, setHasTag] = useState(post.data.hasTag || "");
  const [description, setDescription] = useState(post.data.description || "");
  const [img, setImg] = useState(null);
  const { currentUser } = useContext(AuthContext);

  const handleFileChange = (e) => setImg(e.target.files[0]);
  const handleHasTagChange = (e) => setHasTag(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      description,
      hasTag,
      timestamp: serverTimestamp(),
    };

    const postDocRef = doc(db, "posts", post.id);
    await updateDoc(postDocRef, updatedData);

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
        }
      );
    }

    setDescription("");
    setHasTag("");
    setImg(null);
    onClose();
  };

  const handleDelete = async () => {
    const postDocRef = doc(db, "posts", post.id);
    await deleteDoc(postDocRef);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="hasTag" className="block text-sm font-medium text-gray-700">
          Hashtag
        </label>
        <input
          type="text"
          id="hasTag"
          value={hasTag}
          onChange={handleHasTagChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={handleDescriptionChange}
          rows="3"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Upload Image</label>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="imageUpload"
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
                <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
              </>
            )}
          </label>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          {img && (
            <button
              type="button"
              className="mt-2 text-red-600 hover:text-red-800"
              onClick={() => setImg(null)}
            >
              <ImCancelCircle size={24} />
            </button>
          )}
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="mr-2 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save
        </button>
        {post.data.createdBy === currentUser.uid && (
          <button
            type="button"
            onClick={handleDelete}
            className="ml-2 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
}

export default EditPost;
