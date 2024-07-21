import Layout from "../layouts/Layout";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

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
  const { currentUser } = useContext(AuthContext);

  return (
    <Layout>
    <div className="w-full max-w-5xl mx-auto bg-gray-100 p-4">
  <div className="relative">
    <img
      src={profileData.backgroundImage}
      alt="Background"
      className="w-full h-64 object-cover rounded-lg"
    />
    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
      <img
        src={profileData.avatar}
        alt="Avatar"
        className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
      />
    </div>
  </div>
  <div className="bg-white p-6 rounded-lg shadow-md mt-4">
    <div className="text-center mt-16">
      <h1 className="text-2xl font-bold">{currentUser.displayName || profileData.name}</h1>
      <p className="text-gray-600 mt-2">{profileData.bio}</p>
      <div className="flex justify-center space-x-2 mt-2">
        {profileData.socialLinks.map((link, index) => (
          <a key={index} href={link.url} className="text-blue-500 hover:underline">
            {link.platform}
          </a>
        ))}
      </div>
      <div className="flex justify-center mt-4 space-x-4 gap-6 flex-wrap">
        <div className="text-center">
          <span className="font-semibold text-lg">{profileData.stats.followers}</span><br />
          Followers
        </div>
        <div className="text-center">
          <span className="font-semibold text-lg">{profileData.stats.following}</span><br />
          Following
        </div>
        <div className="flex justify-center mt-2 space-x-2 gap-4">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">Follow</button>
          <button className="bg-gray-300 py-2 px-4 rounded-lg hover:bg-gray-400">Resume</button>
          <button className="bg-gray-300 py-2 px-4 rounded-lg hover:bg-gray-400">...</button>
        </div>
      </div>
    </div>
    <div className="mt-4 border-t pt-4 flex flex-col md:flex-row">
      <div className="flex-1">
        <h2 className="text-xl font-bold">About</h2>
        <p className="mt-4 text-gray-700">{profileData.about}</p>
        <div className="mt-4">
          <h3 className="font-semibold">Expertise</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {profileData.skills.map((skill, index) => (
              <span key={index} className="bg-gray-200 py-1 px-2 rounded-lg text-sm">{skill}</span>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold">Fluent in</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {profileData.languages.map((language, index) => (
              <span key={index} className="bg-gray-200 py-1 px-2 rounded-lg text-sm">{language}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full md:w-64 mt-4 md:mt-0 md:ml-8">
        <div className="mb-4">
          <h3 className="font-semibold">Front page</h3>
          <a href={profileData.karma.page} className="text-blue-500 hover:underline">{profileData.karma.page}</a>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold">Community Karma</h3>
          <div className="mt-2">
            <div className="flex justify-between text-gray-700">
              <span>Threads</span>
              <span>{profileData.karma.threads}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Replies</span>
              <span>{profileData.karma.replies}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Shows</span>
              <span>{profileData.karma.shows}</span>
            </div>
            <div className="flex justify-between text-gray-700">
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
