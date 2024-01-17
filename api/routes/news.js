const express = require("express");
const router = express.Router();
const Article = require("../models/article");

//Getting all
router.get("/", async (req, res) => {
  try {
    let query = {};
    if (req.query.category) {
      query.category = req.query.category;
    }
    const articles = await Article.find(query);
    //odgovaramo sa json
    res.json(articles);
  } catch (err) {
    //500 znaci da imamo neku gresku na serveru
    res.status(500).json({ message: err.message });
  }
});
//Getting one
router.get("/:id", getArticles, (req, res) => {
  res.json(res.article);
});
//Creating one
router.post("/", async (req, res) => {
  const article = new Article({
    title: req.body.title,
    description: req.body.description,
    date: new Date(),
    author: req.body.author,
    image: req.body.image,
    category: req.body.category,
    url: req.body.url,
    source: req.body.source,
  });

  try {
    const newArticle = await article.save();
    res.status(201).json(newArticle);
  } catch (err) {
    //400 znaci da korisnik nije lepo uneo podatke
    res.status(400).json({ message: err.message });
  }
});
//Updating one
router.patch("/:id", getArticles, async (req, res) => {
  if (req.body.title != null) {
    res.article.title = req.body.title;
  }
  if (req.body.description != null) {
    res.article.description = req.body.description;
  }
  try {
    const updateArticle = await res.article.save();
    res.json(updateArticle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//Deleting one
router.delete("/:id", getArticles, async (req, res) => {
  try {
    await res.article.deleteOne();
    res.json({ message: "Deleted Subscriber" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Koristicemo midelware, to je funkcija koja se ponavlja u http kodu
//ova funkcija vraca article po id-u
async function getArticles(req, res, next) {
  let article;
  try {
    article = await Article.findById(req.params.id);
    if (article == null) {
      return res.status(404).json({ message: "Cannot find subscriber" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.article = article;
  next();
}

// router.post("/add-to-database", async (req, res) => {
//   try {
//     const apiKey = "0450336dc6ae7225ab04b12d5ccf784d"; // Replace with your actual API key
//     const apiUrl = "http://api.mediastack.com/v1/news";
//
//     const apiResponse = await axios.get(apiUrl, {
//       params: {
//         access_key: apiKey,
//         keywords: "tennis", // You can customize the query parameters based on your requirements
//         // Add more parameters as needed (sources, categories, countries, languages, etc.)
//       },
//     });
//
//     if (apiResponse.status === 200) {
//       const apiData = apiResponse.data.data;
//
//       // Create an array of promises for saving articles
//       const savePromises = apiData.map((item) => {
//         const article = new Article({
//           title: item.title,
//           description: item.description,
//         });
//
//         return article.save();
//       });
//
//       // Wait for all promises to resolve before sending a response
//       await Promise.all(savePromises);
//
//       res.json({ message: "Data added to the database successfully" });
//     } else {
//       res.status(apiResponse.status).json({ error: "API Request Failed" });
//     }
//   } catch (err) {
//     console.error("Error fetching and adding data from MediaStack API:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

module.exports = router;
