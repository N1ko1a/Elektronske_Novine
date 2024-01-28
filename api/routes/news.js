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
      .sort({ date: -1, time: -1 });

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

//like article
router.post("/:id/like", getArticles, async (req, res) => {
  try {
    res.article.like++;
    const updateArticle = await res.article.save();
    res.json(updateArticle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//dislike article
router.post("/:id/dislike", getArticles, async (req, res) => {
  try {
    res.article.dislike++;
    const updateArticle = await res.article.save();
    res.json(updateArticle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Creating comment
router.post("/:id/comment", getArticles, async (req, res) => {
  const { user, content } = req.body;
  try {
    const comment = { user, content };
    res.article.comments.push(comment); // Note the correct field name here
    const updatedArticle = await res.article.save();
    res.json(updatedArticle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Like comment
router.post(
  "/:id/comment/:commentId/like",
  getArticles,
  getComment,
  async (req, res) => {
    try {
      res.comment.like++;
      const updateArticle = await res.article.save();
      res.json(updateArticle);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
);

//Dislike comment
router.post(
  "/:id/comment/:commentId/dislike",
  getArticles,
  getComment,
  async (req, res) => {
    try {
      //posot vec imamo ceo objekat comment samo pristupamo elementu dislike
      res.comment.dislike++;
      //kada smo promenili element onda sacuvamo promene
      const updateComment = await res.article.save();
      res.json(updateComment);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
);

// Find comment
async function getComment(req, res, next) {
  let comment;
  try {
    //Ulazimo u objekat article pa zatim u objekat comment i onda biramo element id
    comment = res.article.comments.id(req.params.commentId); //vraca ceo objekat comment
    //Ako bude naso bice true
    if (!comment) {
      return res.status(404).json({ message: "Cannot find comment" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  //res.comment postavljamo da bude objekat comment
  res.comment = comment;
  next();
}

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
module.exports = router;
