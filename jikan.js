const jikanData = {
  data: {
    mal_id: 0,
    url: "string",
    images: {
      jpg: {
        image_url: "string",
        small_image_url: "string",
      },
      webp: {
        image_url: "string",
        small_image_url: "string",
      },
    },
    name: "string",
    name_kanji: "string",
    nicknames: ["string"],
    favorites: 0,
    about: "string",
  },
};

const axios = require("axios");

// Base URL for Jikan API v4
const JIKAN_BASE_URL = "https://api.jikan.moe/v4";

// Rate limiting helper - Jikan allows 3 requests per second
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetches anime character data from Jikan API
 * @param {number} characterId - The MAL character ID
 * @returns {Promise<Object>} - Character data matching jikanData schema
 */
async function fetchCharacterData(characterId) {
  try {
    // Add delay to respect rate limiting
    await delay(334); // ~3 requests per second

    const response = await axios.get(
      `${JIKAN_BASE_URL}/characters/${characterId}`
    );
    const { data } = response.data;

    // Parse and return only the fields we need based on our schema
    return {
      data: {
        mal_id: data.mal_id,
        url: data.url,
        images: {
          jpg: {
            image_url: data.images.jpg.image_url,
            small_image_url: data.images.jpg.small_image_url,
          },
          webp: {
            image_url: data.images.webp.image_url,
            small_image_url: data.images.webp.small_image_url,
          },
        },
        name: data.name,
        name_kanji: data.name_kanji,
        nicknames: data.nicknames,
        favorites: data.favorites,
        about: data.about,
      },
    };
  } catch (error) {
    console.error("Error fetching character data:", error.message);
    throw error;
  }
}

// Export both the schema and the fetch function
module.exports = {
  jikanData,
  fetchCharacterData,
};
