const DirectMessages = () => {
  const chats = [
    {
      name: "John Doe",
      message: "Hey, how's it going?",
      timestamp: "10:30 AM",
      online: true,
      avatar: "https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1720742400&semt=ais_user",
    },
    {
      name: "Jane Smith",
      message: "Just finished a meeting. Anything urgent?",
      timestamp: "11:15 AM",
      online: true,
      avatar: "https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1720742400&semt=ais_user",
    },
    {
      name: "Alex Johnson",
      message: "I am looking to work with a developer...",
      timestamp: "12:05 PM",
      online: true,
      avatar: "https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1720742400&semt=ais_user",
    },
    {
      name: "Emily Davis",
      message: "I am looking to work with a developer...",
      timestamp: "1:45 PM",
      online: true,
      avatar: "https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1720742400&semt=ais_user",
    },
    {
      name: "Chris Miller",
      message: "I heard there's a team event next week.",
      timestamp: "2:30 PM",
      online: true,
      avatar: "https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1720742400&semt=ais_user",
    },
    {
      name: "Megan Taylor",
      message: "Just wanted to say hi! 😊",
      timestamp: "3:20 PM",
      online: true,
      avatar: "https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1720742400&semt=ais_user",
    },
    {
      name: "Ryan Carter",
      message: "Any updates on the project?",
      timestamp: "4:10 PM",
      online: true,
      avatar: "https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1720742400&semt=ais_user",
    },
    {
      name: "Sophie Anderson",
      message: "I'm looking forward to the weekend.",
      timestamp: "5:00 PM",
      online: false,
      avatar: "https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1720742400&semt=ais_user",
    },
  ];

  return (
    <div className="w-1/3 border-r border-gray-300 h-screen overflow-y-auto">
      <div className="p-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div className="overflow-y-auto">
        {chats.map((chat, index) => (
          <div
            key={index}
            className="flex items-center p-4 hover:bg-gray-100 cursor-pointer"
          >
            <img
              src={chat.avatar}
              alt={`${chat.name} avatar`}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold">{chat.name}</h4>
                <span className="text-xs text-gray-500">{chat.timestamp}</span>
              </div>
              <p className="text-gray-600 truncate">{chat.message}</p>
            </div>
            {chat.online && (
              <span className="w-3 h-3 bg-green-500 rounded-full ml-2"></span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DirectMessages;
