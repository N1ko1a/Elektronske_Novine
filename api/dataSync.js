const axios = require("axios");
const Article = require("./models/article");

async function syncDataToDatabase() {
  try {
    const apiKey = "0450336dc6ae7225ab04b12d5ccf784d"; // Replace with your actual API key
    const apiUrl = "http://api.mediastack.com/v1/news";
    const pageSize = 10; // Set the number of items you want per page
    const language = "en"; // Set the desired language code
    const country = "rs"; // Set the desired country code
    const date = "2024-01-01,2024-01-16";

    let currentPage = 1;
    let currentItemCount = await Article.countDocuments();
    console.log(currentItemCount);

    const savePromises = [];

    while (true) {
      console.log("Current Page:", currentPage);

      const apiResponse = await axios.get(apiUrl, {
        params: {
          access_key: apiKey,
          limit: pageSize,
          offset: (currentPage - 1) * pageSize,
          language: language,
          countries: country,
          date: date,
        },
      });

      if (apiResponse.status === 200) {
        const apiData = apiResponse.data.data;

        for (const item of apiData) {
          const existingArticle = await Article.findOne({ title: item.title });
          if (!existingArticle) {
            const article = new Article({
              title: item.title,
              description: item.description,
              date: item.published_at,
              author: item.author,
              image: item.image,
              category: item.category,
              url: item.url,
              source: item.source,
            });
            savePromises.push(article.save());
            currentItemCount++;
          }
        }

        const pageCount = apiResponse.data.pagination.count;
        const totalCount = apiResponse.data.pagination.total;

        console.log("Results count on current page:", pageCount);
        console.log("Total count of results available:", totalCount);

        if (pageCount < pageSize || currentItemCount >= 100) {
          // Exit the loop if the page count is less than the page size or if we have reached the desired item count
          break;
        }

        currentPage++;
      } else {
        console.error("API Request Failed: ", apiResponse.status);
        break; // Exit the loop in case of API request failure
      }
    }

    // Wait for all promises to resolve
    await Promise.all(savePromises);
    console.log("Data sync to the database successful");
  } catch (err) {
    console.error("Error fetching and adding data from MediaStack API:", err);
  }
}

module.exports = { syncDataToDatabase };
