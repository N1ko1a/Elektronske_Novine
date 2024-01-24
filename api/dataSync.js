const axios = require("axios");
const Article = require("./models/article");

async function syncDataToDatabase() {
  try {
    const apiKey = "a4def157fa5f42c5b5f7cdf28ca49e30";
    const apiUrl = "https://newsapi.org/v2/top-headlines";
    const pageSize = 20;
    const country = "us";
    const date = "2024-01-01";
    const dateto = "2024-01-02";
    const sort = "publishedAt";
    const categoryArray = [
      "business",
      "entertainment",
      "general",
      "health",
      "science",
      "sports",
      "technology",
    ];
    let currentItemCount = await Article.countDocuments();
    console.log(currentItemCount);

    for (const category of categoryArray) {
      const savePromises = [];
      let currentPage = 1;
      let totalPages = 1; // Set initial value

      while (currentPage <= totalPages) {
        console.log("Current Page:", currentPage);

        const apiResponse = await axios.get(apiUrl, {
          params: {
            apiKey: apiKey,
            pageSize: pageSize,
            page: currentPage,
            country: country,
            category: category,
          },
        });

        if (apiResponse.status === 200) {
          const apiData = apiResponse.data.articles;

          for (const item of apiData) {
            const existingArticle = await Article.findOne({
              title: item.title,
            });
            if (
              !existingArticle &&
              item.content != null &&
              item.title != null
            ) {
              const article = new Article({
                title: item.title,
                description: item.description,
                date: item.publishedAt,
                author: item.author,
                image: item.urlToImage,
                category: category,
                url: item.url,
                content: item.content,
              });
              savePromises.push(article.save());
              currentItemCount++;
            }
          }

          totalPages = Math.ceil(apiResponse.data.totalResults / pageSize);
          currentPage++;
        } else {
          console.error("API Request Failed: ", apiResponse.status);
          break;
        }
      }

      await Promise.all(savePromises);
      console.log(
        `Data sync for category ${category} to the database successful`,
      );
    }
  } catch (err) {
    console.error("Error fetching and adding data from News API:", err);
  }
}

const updateContentFromApi = async () => {
  try {
    const apiKey = "a4def157fa5f42c5b5f7cdf28ca49e30";
    const apiUrl = "https://newsapi.org/v2/everything";
    const searchFields = "title,content";

    // Fetch all articles from the database
    const articles = await Article.find({}, "title");

    for (const article of articles) {
      const apiResponse = await axios.get(apiUrl, {
        params: {
          apiKey: apiKey,
          q: article.title,
          searchIn: searchFields,
        },
      });

      if (apiResponse.status === 200) {
        const apiData = apiResponse.data.articles;

        if (apiData.length > 0) {
          const updatedContent = apiData[0].content;

          // Update content in the database
          await Article.updateOne(
            { title: article.title },
            { content: updatedContent },
          );

          console.log(
            `Content updated for article with title: ${article.title}`,
          );
        } else {
          console.log(
            `No match found for article with title: ${article.title}`,
          );
        }
      } else {
        console.error("API Request Failed: ", apiResponse.status);
        break;
      }
    }

    console.log("Content update process complete.");
  } catch (err) {
    console.error("Error updating content from News API:", err);
  }
};

module.exports = { syncDataToDatabase, updateContentFromApi };
