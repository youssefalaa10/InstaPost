
function AddPostBtn() {
  return (
    <div className="fixed bottom-5 right-6 bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center transform transition-transform duration-300 hover:scale-110 hover:bg-sky-700">
    <button className="focus:outline-none ">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    </button>
  </div>
  )
}

export default AddPostBtn
