import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5000; // Your backend server port

app.use(cors()); // Enable CORS for frontend access
app.use(express.json());

const BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;

// Route to fetch Twitter user by username
app.get("/api/twitter/user/:username", async (req, res) => {
  try {
    const { username } = req.params;

    const response = await axios.get(
      `https://api.twitter.com/2/users/by/username/${username}`,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
        params: {
          "user.fields": "description,profile_image_url",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(
      "Error fetching Twitter user:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to fetch Twitter user" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

