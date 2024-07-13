

const SocialPost = ({
  postImage,
  title,
  description,
  posterImage,
  posterName,
  postTime,
  likes,
}) => {
  return (
    <div className="p-4 border rounded-lg shadow-lg bg-white mb-4">
      <div className="flex items-center mb-4">
        <img
          src={posterImage}
          alt="avatar"
          className="w-10 h-10 rounded-full mr-2"
        />
        <div className="flex flex-col">
          <span className="font-semibold">{posterName}</span>
         
          <span className="text-gray-500 text-sm">{postTime}</span>
        </div>
          <i className="pi pi-ellipsis-v text-gray-500 ml-auto justify-end"></i>
      </div>
      <span className="text-blue-400 text-sm">
            {/* {postTime} */}
            # football
          </span>
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-700 mb-4">{description}</p>
      <img
        src={postImage}
        alt="post"
        className="w-full h-60 object-cover rounded-lg mb-4"
      />
    
      <div className="flex items-center justify-between">
        <button className="flex items-center text-gray-500">
          <i className="pi pi-heart"></i>
          {likes} Likes
        </button>
        <button className="flex items-center text-gray-500">
          <i className="pi pi-comment"></i>
          Comment
        </button>
       
      </div>
    </div>
  );
};

export default SocialPost;
