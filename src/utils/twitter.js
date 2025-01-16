import axios from "axios";

const BEARER_TOKEN =
  "AAAAAAAAAAAAAAAAAAAAAB7fyAEAAAAAcoqbsVMovm5wAtAUttx9GyYoeyM%3DcrfZwZjAFJ2GS8ClEDguH5BE6zacXAmzpOh72iTR6X5aNx2iLw"; // Replace with your valid Bearer Token

const twitterClient = axios.create({
  baseURL: "https://api.twitter.com/2",
  headers: {
    Authorization: `Bearer ${BEARER_TOKEN}`,
  },
});

// Fetch user details by username
export const fetchUserByUsername = async (username) => {
  try {
    const trimmedUsername = username.trim(); // Ensure username is trimmed
    console.log(`Fetching user with username: ${trimmedUsername}`); // Log the username being fetched
    const response = await twitterClient.get(`/users/by/username/${trimmedUsername}`, {
      params: {
        "user.fields": "description,profile_image_url",
      },
    });
    console.log("User fetch response:", response.data); // Log the full response
    return response.data.data;
  } catch (error) {
    console.error("Error fetching user:", error.response ? error.response.data : error.message);
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
