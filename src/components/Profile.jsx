import Layout from "../layouts/Layout";


const Profile = ({
  name,
  bio,
  avatar,
  backgroundImage,
  socialLinks,
  stats,
  about,
  expertise,
  languages,
  karma,
  badges,
}) => {
  const profileData = {
    name: "Youssef Alaa",
    bio: "Follow for daily design tips, memes, Flutter tips, 🔥 developer / co-founder ...",
    avatar:
      "https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1720742400&semt=ais_user",
    backgroundImage: "https://t.ly/yBDQd",
    socialLinks: [
      { platform: "Twitter", url: "https://twitter.com/example" },
      { platform: "LinkedIn", url: "https://linkedin.com/in/example" },
      // more links
    ],
    stats: { followers: 3492, following: 3492 },
    about: "Hi 👋, I'm Youssef - Cofounder & CEO working on InstaPost...",

    skills: [
      "Web development",
      "UI/UX design",
      "React/Flutter",
      "App Development",
    ],

    languages: ["English", "Spanish", "French"],
    karma: {
      page: "https://github.com/youssefalaa10",
      threads: 7216,
      replies: 4812,
      shows: 37,
      invited: 260,
    },
   
  };

  return (
    <Layout>
    <div className="w-4/5 mx-auto bg-gray-100">
      <div className="relative">
        <img
          src={profileData.backgroundImage}
          alt="Background"
          className="w-full h-64 object-cover"
        />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <img
            src={profileData.avatar}
            alt="Avatar"
            className="w-32 h-32 rounded-full border-4 border-white"
          />
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mt-4">
        <div className="text-center mt-16">
          <h1 className="text-2xl font-bold">{profileData.name}</h1>
          <p className="text-gray-600">{profileData.bio}</p>
          <div className="flex justify-center space-x-2 mt-2">
            {profileData.socialLinks.map((link, index) => (
              <a key={index} href={link.url} className="text-blue-500">
                {link.platform}
              </a>
            ))}
          </div>
          <div className="flex justify-center mt-2 space-x-4 gap-6">
            <div>
              <span className="font-semibold">
                {profileData.stats.followers}
              </span>{" "}
              Followers
            </div>
            <div>
              <span className="font-semibold">
                {profileData.stats.following}
              </span>{" "}
              Following
            </div>
            <div className="flex space-x-2 ">
              <button className="bg-blue-500 text-white py-2 px-4 rounded-lg">
                Follow
              </button>
              <button className="bg-gray-300 py-2 px-4 rounded-lg">
                Resume
              </button>
              <button className="bg-gray-300 py-2 px-4 rounded-lg">...</button>
            </div>
          </div>
        </div>
        <div className="mt-2 border-t pt-2 flex">
          <div className="flex-1">
            <h2 className="text-xl font-bold">About</h2>
            <p className="mt-4">{profileData.about}</p>
           
            <div className="mt-4">
              <h3 className="font-semibold">Expertise</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {profileData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 py-1 px-2 rounded-lg"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold">Fluent in</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {profileData.languages.map((language, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 py-1 px-2 rounded-lg"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="w-64 ml-8">
            <div className="mb-4">
              <h3 className="font-semibold">Front page</h3>
              <a href={profileData.karma.page} className="text-blue-500">
                {profileData.karma.page}
              </a>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold">Community Karma</h3>
              <div className="mt-2">
                <div className="flex justify-between">
                  <span>Threads</span>
                  <span>{profileData.karma.threads}</span>
                </div>
                <div className="flex justify-between">
                  <span>Replies</span>
                  <span>{profileData.karma.replies}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shows</span>
                  <span>{profileData.karma.shows}</span>
                </div>
                <div className="flex justify-between">
                  <span>People invited</span>
                  <span>{profileData.karma.invited}</span>
                </div>
              </div>
            </div>
         
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Profile;
