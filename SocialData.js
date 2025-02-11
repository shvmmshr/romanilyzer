const userIdUrl = "https://api.socialdata.tools/twitter/user/[user_id]";
const screenNameUrl = "https://api.socialdata.tools/twitter/user/[screen_name]";

async function getSocialData() {
  try {
    const response = await fetch(
      "https://api.socialdata.tools/twitter/user/elonmusk",
      {
        headers: {
          Authorization:
            "BEARER_API_KEY",
          Accept: "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
fetch("https://api.socialdata.tools/twitter/user/MMatt14", {
  headers: {
    Authorization: "1986|9vA4xJl84iCbpJezHffZFSuiIz39qJSgXTWIpkx42ce1080f",
    Accept: "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
