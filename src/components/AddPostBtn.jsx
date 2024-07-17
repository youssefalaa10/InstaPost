import { FiEdit } from "react-icons/fi";

function AddPostBtn() {
  return (
    <div className="fixed bottom-5 right-6 bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center transform transition-transform duration-300 hover:scale-110 hover:bg-sky-700">
    <button className="focus:outline-none ">
    <FiEdit className="text-white text-xl" />
    </button>
  </div>
  )
}

export default AddPostBtn
