import axios from "axios";

const BEARER_TOKEN = import.meta.env.VITE_TWITTER_BEARER_TOKEN; // Use environment variable

if (!BEARER_TOKEN) {
  console.error("Error: Twitter API Bearer Token is missing!");
}

const twitterClient = axios.create({
  baseURL: "https://api.twitter.com/2",
  headers: {
    Authorization: `Bearer ${BEARER_TOKEN}`,
  },
});

// Fetch user details by username
export const fetchUserByUsername = async (username) => {
  try {
    const trimmedUsername = username.trim();
    if (!trimmedUsername) {
      console.error("Username is empty or invalid.");
      return null;
    }

    const response = await axios.get(
      `http://localhost:5000/api/twitter/user/${trimmedUsername}`
    );
    return response.data.data;
  } catch (error) {
    console.error(
      "Error fetching user:",
      error.response ? error.response.data : error.message
    );
    return null;
  }
};
// Fetch recent tweets by user ID
export const fetchTweetsByUserId = async (userId) => {
  try {
    const response = await twitterClient.get(`/users/${userId}/tweets`, {
      params: {
        max_results: 100, // Max number of tweets to fetch
        "tweet.fields": "created_at,public_metrics",
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching tweets:", error);
    return null;
  }
};
