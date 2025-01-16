import React, { useState } from "react";
import { fetchUserByUsername, fetchTweetsByUserId } from "./utils/twitter";
import { analyzeTweets, matchCharacter } from "./utils/analyzer";
import image1 from "./components/images/1.png";
import image2 from "./components/images/2.png";

function App() {
  const [username, setUsername] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    try {
      setError(null);
      console.log("Analyzing username:", username);
      const user = await fetchUserByUsername(username);
      console.log("Fetched user:", user);
      if (user) {
        const tweets = await fetchTweetsByUserId(user.id);
        console.log("Fetched tweets:", tweets);
        if (tweets) {
          const { keywords, sentiment } = analyzeTweets(tweets);
          const character = matchCharacter(keywords, sentiment);
          setResult({ user, character });
        } else {
          setError("Unable to fetch tweets for this user.");
        }
      } else {
        setError("User not found.");
      }
    } catch (error) {
      console.error("Error during analysis:", error);
      setError("An error occurred during analysis.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 flex flex-col items-center justify-center p-8 relative">
      {/* Left Image */}
      <img
        src={image1}
        alt="Left Decoration"
        className="absolute left-0 bottom-0 h-100 "
      />

      {/* Right Image */}
      <img
        src={image2}
        alt="Right Decoration"
        className="absolute right-0 bottom-0 h-100 "
      />

      {/* Main Content */}
      <div className="text-center z-10">
        <h1 className="text-6xl font-bold text-pink-700 mb-8">Romanilyzer</h1>
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
          <input
            type="text"
            placeholder="Enter Twitter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border-2 border-pink-300 p-3 rounded-lg w-full mb-6 focus:outline-none focus:border-pink-500 transition duration-300"
          />
          <button
            onClick={handleAnalyze}
            className="bg-pink-500 text-white px-6 py-3 rounded-lg w-full hover:bg-pink-600 transition duration-300"
          >
            Analyze
          </button>
          {error && <div className="mt-4 text-red-500">{error}</div>}
        </div>
      </div>

      {/* Result Section */}
      {result && (
        <div className="mt-12 text-center z-10 bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
          <h2 className="text-4xl font-bold text-pink-700 mb-4">
            Matched Character:
          </h2>
          <p className="text-2xl text-pink-800">{result.character.name}</p>
          <p className="text-xl text-pink-700">
            From: {result.character.anime}
          </p>
        </div>
      )}
      <div className="mt-4 text-sm text-gray-600 text-center">
        <p>
          🚧 Note: This app is currently in development and may not work as<br/>
          expected. We're working hard to bring you the best experience! 🚧
        </p>
        {/* <p className="mt-2">
          Feel free to try it out and share your feedback. Your support means
          the world to us! 🌟
        </p> */}
      </div>
      {/* Footer */}
      <div className="absolute bottom-4 text-center text-pink-700">
        <p>Made with ❤️ by Shivam, Matt</p>
      </div>
    </div>
  );
}

export default App;
