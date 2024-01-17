const axios = require("axios");
const Article = require("./models/article");

async function syncDataToDatabase() {
  try {
    const apiKey = "0450336dc6ae7225ab04b12d5ccf784d";
    const apiUrl = "http://api.mediastack.com/v1/news";
    const pageSize = 10; //Broj predmeta po strani
    const language = "en"; // Jezik na koje ce vesti da budu
    const country = "rs"; // Iz koje zemlje ce da poticu vesti
    const date = "2024-01-01,2024-01-16"; // Vremenski opseg vesti

    let currentPage = 1; // Treenutna stranica na kojoj se peginetion nalazi
    let currentItemCount = await Article.countDocuments(); // Trenutan broj item-a koji se nalaze u bazi
    console.log(currentItemCount);

    const savePromises = [];

    while (true) {
      console.log("Current Page:", currentPage);

      const apiResponse = await axios.get(apiUrl, {
        params: {
          access_key: apiKey,
          limit: pageSize, //zadajemo koliko ce da ima item-a po strani
          offset: (currentPage - 1) * pageSize, //ovo preskace odredjen broj item-a koji mu zadajemo i onda uzima 10 novih item-a
          language: language,
          countries: country,
          date: date,
        },
      });

      if (apiResponse.status === 200) {
        const apiData = apiResponse.data.data; // dva puta data zbog arhitekture podataka koji dobijamo od api-a

        for (const item of apiData) {
          const existingArticle = await Article.findOne({ title: item.title }); // Trazimo artikal po title i proveravamo da li ga ima u bazi
          if (!existingArticle) {
            const article = new Article({
              // Ako ga nema onda ubacujemo ceo item u bazu
              title: item.title,
              description: item.description,
              date: item.published_at,
              author: item.author,
              image: item.image,
              category: item.category,
              url: item.url,
              source: item.source,
            });
            savePromises.push(article.save()); // Ova linija dodaje artikal u bazu i ona je asihrona i vraca promise koji mi dodajemo u niz sa promisima
            currentItemCount++;
          }
        }

        const pageCount = apiResponse.data.pagination.count; //Broj item-a na trenutnoj stranici
        const totalCount = apiResponse.data.pagination.total; // Ukupan broj item-a na svim stranicama

        console.log("Results count on current page:", pageCount);
        console.log("Total count of results available:", totalCount);

        currentPage++;
      } else {
        console.error("API Request Failed: ", apiResponse.status);
        break; // Exit the loop in case of API request failure
      }
    }

    // Wait for all promises to resolve
    await Promise.all(savePromises); //Ovde cekamo da se svi promisi rese da bih nastavili dalje
    console.log("Data sync to the database successful");
  } catch (err) {
    console.error("Error fetching and adding data from MediaStack API:", err);
  }
}

module.exports = { syncDataToDatabase };
