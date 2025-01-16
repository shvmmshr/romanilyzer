import React, { useState } from "react";
import { fetchUserByUsername, fetchTweetsByUserId } from "./utils/twitter";
import { analyzeTweets, matchCharacter } from "./utils/analyzer"; // Import the matching function

function App() {
  const [username, setUsername] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null); // Add state for error messages

  const handleAnalyze = async () => {
    try {
      setError(null); // Reset error state
      console.log("Analyzing username:", username); // Log the username
      const user = await fetchUserByUsername(username);
      console.log("Fetched user:", user); // Log the fetched user data
      if (user) {
        const tweets = await fetchTweetsByUserId(user.id);
        console.log("Fetched tweets:", tweets); // Log the fetched tweets
        if (tweets) {
          const { keywords, sentiment } = analyzeTweets(tweets);
          const character = matchCharacter(keywords, sentiment);
          setResult({ user, character });
        } else {
          // Handle case when tweets are not fetched
          setError("Unable to fetch tweets for this user.");
        }
      } else {
        // Handle case when user is not found
        setError("User not found.");
      }
    } catch (error) {
      console.error("Error during analysis:", error);
      setError("An error occurred during analysis.");
    }
  };

  return (
    <div className="min-h-screen bg-pink-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-pink-700 mb-8">Romanilyzer</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Enter Twitter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        />
        <button
          onClick={handleAnalyze}
          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
        >
          Analyze
        </button>
        {error && (
          <div className="mt-4 text-red-500">
            {error}
          </div>
        )}
      </div>
      {result && (
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold">Matched Character:</h2>
          <p className="text-xl">{result.character.name}</p>
          <p className="text-lg">From: {result.character.anime}</p>
        </div>
      )}
    </div>
  );
}

export default App;
