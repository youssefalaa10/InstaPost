import { useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

function AddPost() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [postImage, setPostImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleInputClick = () => {
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  const handleFileChange = (e) => {
    setPostImage(e.target.files[0]);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  return (
    <div>
      {currentUser && (
        <div className="w-full mt-1 mb-4 p-4 border rounded-lg shadow-sm bg-white">
          <div className="flex items-center mb-4">
            <img
              className="w-10 h-10 rounded-full"
              src="https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1720742400&semt=ais_user"
              alt="User profile"
            />
            <input
              type="text"
              placeholder="What's on your mind ..."
              className="ml-4 w-full p-2 rounded-full border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleInputClick}
            />
          </div>
          <div className="flex justify-around"></div>
        </div>
      )}
      
      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Create Post</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Post Image:</label>
                <input
                  type="file"
                  className="w-full p-2 border rounded"
                  onChange={handleFileChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Title:</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Enter title"
                  value={title}
                  onChange={handleTitleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description:</label>
                <textarea
                  className="w-full p-2 border rounded"
                  placeholder="Enter description"
                  value={description}
                  onChange={handleDescriptionChange}
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-2 px-4 py-2 bg-gray-300 rounded"
                  onClick={handleClosePopup}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
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
