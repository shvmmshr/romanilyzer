import nlp from "compromise"; // Import the NLP library
import characters from "../data/characters.json"; // Import the dataset

// Analyze tweets and extract keywords/sentiment
export const analyzeTweets = (tweets) => {
  const allText = tweets.map((tweet) => tweet.text).join(" ");
  const doc = nlp(allText);

  // Extract keywords (nouns and adjectives)
  const keywords = doc
    .nouns()
    .out("array")
    .concat(doc.adjectives().out("array"));

  // Simple sentiment analysis
  // If compromise doesn't support sentiment, use 'sentiment' library
  let sentiment = 0;
  if (doc.sentiment) {
    sentiment = doc.sentiment().score;
  } else {
    // Fallback to 'sentiment' library
    const Sentiment = require('sentiment');
    const sentimentAnalyzer = new Sentiment();
    const result = sentimentAnalyzer.analyze(allText);
    sentiment = result.score;
  }

  return {
    keywords,
    sentiment,
  };
};

// Match user's keywords and sentiment to an anime character
export const matchCharacter = (keywords, sentiment) => {
  let bestMatch = null;
  let highestScore = 0;

  characters.forEach((character) => {
    // Calculate the number of common keywords
    const commonKeywords = character.keywords.filter((keyword) =>
      keywords.includes(keyword)
    ).length;

    // Adjust score based on sentiment (optional)
    const sentimentScore = sentiment > 0 ? 1 : 0; // Positive sentiment adds to the score

    // Total score for this character
    const score = commonKeywords + sentimentScore;

    // Update best match if this character has a higher score
    if (score > highestScore) {
      highestScore = score;
      bestMatch = character;
    }
  });

  return bestMatch;
};
