const express = require("express");
const router = express.Router();
const Article = require("../models/article");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtMid = require("../middlewarw/authenticated");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, "/home/nikola/Nikola/github/Elektronske_Novine/api/uploads/");
    cb(null, "/api/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

//Getting all
router.get("/", async (req, res) => {
  try {
    // let query = { approved: true }; // Objekat za upite
    let query = {};
    if (req.query.category) {
      // ako je u get zahtevu naveden query parametar onda radi ovaj kod ispod
      query.category = req.query.category; // vrednost query zahteva se postavlja u query.category
    }

    if (req.query.approved) {
      query.approved = req.query.approved;
    }
    if (req.query.title) {
      query.title = { $regex: req.query.title, $options: "i" };
    }
    const page = req.query.page || 0;
    const articlesPerPage = req.query.itemCount || 12;

    // Promenljiva za ukupan broj artikala
    let totalArticles;

    if (req.query.category || req.query.title || req.query.approved) {
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
// Upload image and create article
router.post("/", upload.single("file"), async (req, res) => {
  try {
    // Ako postoji req.file (uploadovana slika)
    let imageUrl;
    if (req.file) {
      console.log(req.file);
      imageUrl = `http://localhost:3000/uploads/${req.file.originalname}`;
    }

    const article = new Article({
      title: req.body.title,
      description: req.body.description,
      date: new Date(),
      author: req.body.author,
      image: imageUrl,
      category: req.body.category,
      url: req.body.url,
      source: req.body.source,
      approved: req.body.approved,
    });

    const newArticle = await article.save(); // Čuvanje članka u bazi

    res.status(201).json(newArticle);
  } catch (err) {
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
  if (req.body.approved != null) {
    res.article.approved = req.body.approved;
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
router.post(
  "/:userid/article/:id/like",
  jwtMid.formHandler,
  getArticles,
  async (req, res) => {
    try {
      const userId = req.params.userid;
      const article = res.article;
      console.log("User", userId);
      console.log("Article", article);

      // Check if the user has already liked the comment
      if (!article.like.includes(userId) && !article.dislike.includes(userId)) {
        // User hasn't liked or disliked before
        article.like.push(userId);
        console.log("article: ", article.like);
      } else if (article.dislike.includes(userId)) {
        // User has disliked before, remove from dislike and add to like
        article.dislike = article.dislike.filter((id) => id !== userId);
        article.like.push(userId);
        console.log("article: ", article.like);
      } else {
        // User has already liked this comment
        return res
          .status(400)
          .json({ message: "User has already liked this article." });
      }

      // Save the updated article
      const updatedArticle = await res.article.save();

      res.json({ message: "Article liked successfully." });
    } catch (err) {
      console.error("Error:", err);
      res.status(400).json({ message: err.message });
    }
  },
);
//dislike article
router.post(
  "/:userid/article/:id/dislike",
  jwtMid.formHandler,
  getArticles,
  async (req, res) => {
    try {
      const userId = req.params.userid;
      const article = res.article;
      console.log("User", userId);
      console.log("Article", article);

      // Check if the user has already liked the comment
      if (!article.dislike.includes(userId) && !article.like.includes(userId)) {
        // User hasn't liked or disliked before
        article.dislike.push(userId);
        console.log("article: ", article.dislike);
      } else if (article.like.includes(userId)) {
        // User has disliked before, remove from dislike and add to like
        article.like = article.like.filter((id) => id !== userId);
        article.dislike.push(userId);
        console.log("article: ", article.dislike);
      } else {
        // User has already liked this comment
        return res
          .status(400)
          .json({ message: "User has already disliked this article." });
      }

      // Save the updated article
      const updatedArticle = await res.article.save();

      res.json({ message: "Article disliked successfully." });
    } catch (err) {
      console.error("Error:", err);
      res.status(400).json({ message: err.message });
    }
  },
);
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

// Like comment
router.post(
  "/:id/comment/:commentId/like",
  jwtMid.formHandler,
  getArticles,
  getComment,
  async (req, res) => {
    try {
      console.log("req.user:", req.user); // User ID
      console.log("res.comment:", res.comment); // Article ID

      const userId = req.params.id;
      const comment = res.comment;

      console.log("Comment ", typeof userId);

      // Check if the user has already liked the comment
      if (!comment.like.includes(userId) && !comment.dislike.includes(userId)) {
        // User hasn't liked or disliked before
        comment.like.push(userId);
        console.log("comment: ", comment.like);
      } else if (comment.dislike.includes(userId)) {
        // User has disliked before, remove from dislike and add to like
        comment.dislike = comment.dislike.filter((id) => id !== userId);
        comment.like.push(userId);
        console.log("comment: ", comment.like);
      } else {
        // User has already liked this comment
        return res
          .status(400)
          .json({ message: "User has already liked this comment." });
      }

      // Save the updated article
      const updatedArticle = await res.article.save();

      res.json({ message: "Comment liked successfully." });
    } catch (err) {
      console.error("Error:", err);
      res.status(400).json({ message: err.message });
    }
  },
);
//Dislike comment
router.post(
  "/:id/comment/:commentId/dislike",
  jwtMid.formHandler,
  getArticles,
  getComment,
  async (req, res) => {
    try {
      const userId = req.params.id;
      const comment = res.comment;

      // Check if the user has already liked the comment
      if (!comment.dislike.includes(userId) && !comment.like.includes(userId)) {
        // User hasn't liked or disliked before
        comment.dislike.push(userId);
      } else if (comment.like.includes(userId)) {
        // User has disliked before, remove from dislike and add to like
        comment.like = comment.like.filter((id) => id !== userId);
        comment.dislike.push(userId);
      } else {
        // User has already liked this comment
        return res
          .status(400)
          .json({ message: "User has already disliked this comment." });
      }

      // Save the updated article
      const updatedArticle = await res.article.save();

      res.json({ message: "Comment disliked successfully." });
    } catch (err) {
      console.error("Error:", err);
      res.status(400).json({ message: err.message });
    }
  },
);

//Upload image
router.post("/uploadImage", upload.single("file"), async (req, res) => {
  try {
    res.json(req.file);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
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
// router.post("/approve-all", async (req, res) => {
//   try {
//     const articlesWithFalseApproval = await Article.find({ approved: true });
//     console.log(articlesWithFalseApproval);
//     const updateResult = await Article.updateMany(
//       { approved: false },
//       { $set: { approved: true } },
//     );
//
//     // Provera da li je bilo promena
//     if (updateResult.nModified > 0) {
//       res.json({ message: "Successfully updated all articles to approved." });
//     } else {
//       res.json({ message: "No articles found with status 'false'." });
//     }
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });
module.exports = router;
