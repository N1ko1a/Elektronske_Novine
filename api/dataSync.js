const axios = require("axios");
const Article = require("./models/article");

async function syncDataToDatabase() {
  try {
    const apiKey = "0450336dc6ae7225ab04b12d5ccf784d"; // Replace with your actual API key
    const apiUrl = "http://api.mediastack.com/v1/news";

    const apiResponse = await axios.get(apiUrl, {
      params: {
        access_key: apiKey,
        keywords: "tennis", // You can customize the query parameters based on your requirements
        // Add more parameters as needed (sources, categories, countries, languages, etc.)
      },
    });

    if (apiResponse.status === 200) {
      const apiData = apiResponse.data.data;

      // Create an array of promises for saving articles
      const savePromises = apiData.map((item) => {
        const article = new Article({
          title: item.title,
          description: item.description,
        });

        return article.save();
      });

      // Wait for all promises to resolve
      await Promise.all(savePromises);

      console.log("Data sync to the database successful");
    } else {
      console.error("API Request Failed:", apiResponse.status);
    }
  } catch (err) {
    console.error("Error fetching and adding data from MediaStack API:", err);
  }
}

module.exports = { syncDataToDatabase };
