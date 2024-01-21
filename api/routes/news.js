const express = require("express");
const router = express.Router();
const Article = require("../models/article");

//Getting all
router.get("/", async (req, res) => {
  try {
    let query = {}; // Objekat za upite
    if (req.query.category) {
      // ako je u get zahtevu naveden query parametar onda radi ovaj kod ispod
      query.category = req.query.category; // vrednost query zahteva se postavlja u query.category
    }
    const page = req.query.page || 0;
    const articlesPerPage = req.query.itemCount || 12;

    // Promenljiva za ukupan broj artikala
    let totalArticles;

    if (req.query.category) {
      // Ako je naveden query parametar za kategoriju, računaj ukupan broj samo za tu kategoriju
      totalArticles = await Article.countDocuments(query);
    } else {
      // Inače, računaj ukupan broj svih artikala
      totalArticles = await Article.countDocuments();
    }

    const articles = await Article.find(query)
      .skip(page * articlesPerPage)
      .limit(articlesPerPage)
      .sort([["date", -1]]);

    // Odgovaramo sa json, uključujući ukupan broj artikala
    res.json({ articles, totalArticles });
  } catch (err) {
    // 500 znaci da imamo neku gresku na serveru
    res.status(500).json({ message: err.message });
  }
});
//Getting one
router.get("/:id", getArticles, (req, res) => {
  res.json(res.article); //vracamo sve za artikal koji ima ovaj id
});
//Creating one
router.post("/", async (req, res) => {
  const article = new Article({
    //creiramo novi artikal a on je u stvari objekat i popunjavamo mu elemente
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
    const newArticle = await article.save(); //Ovde sacuvamo artikal u bazu
    res.status(201).json(newArticle);
  } catch (err) {
    //400 znaci da korisnik nije lepo uneo podatke
    res.status(400).json({ message: err.message });
  }
});
//Updating one
router.patch("/:id", getArticles, async (req, res) => {
  if (req.body.title != null) {
    // ako se title razlikuje od nule onda updejtujemo
    res.article.title = req.body.title;
    //uzimamo title iz article i zatim uzimamo title iz body get zahteva
  }
  if (req.body.description != null) {
    // isto za description i sve ostalo
    res.article.description = req.body.description;
  }
  if (req.body.author != null) {
    res.article.author = req.body.author;
  }
  if (req.body.image != null) {
    res.article.image = req.body.image;
  }
  if (req.body.category != null) {
    res.article.category = req.body.category;
  }
  if (req.body.url != null) {
    res.article.url = req.body.url;
  }
  if (req.body.source != null) {
    res.article.source = req.body.source;
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
    await res.article.deleteOne(); // brisemo ceo article koji smo nasli u funkciji getArticle
    res.json({ message: "Deleted Article" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Koristicemo midelware, to je funkcija koja se ponavlja u http kodu
//ova funkcija vraca article po id-u
async function getArticles(req, res, next) {
  let article;
  try {
    article = await Article.findById(req.params.id); //nalazimo artikal po id
    if (article == null) {
      //proveravamo da li ga ima
      return res.status(404).json({ message: "Cannot find article" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  // Ako je članak uspešno pronađen, postavljate ga kao svojstvo objekta res (odgovora). Ovo je korisno ako želite da podaci o članku budu dostupni u sledećem middleware-u ili ruti koji će biti pozvan nakon trenutnog middleware-a.
  res.article = article;
  next(); //nastavi dalje odakle si stao
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
