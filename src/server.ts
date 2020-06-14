import bodyParser from "body-parser";
import express from "express";
import { MongoClient } from "mongodb";
import path from "path";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

MongoClient.connect("mongodb://localhost/star-wars-quotes", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((client) => {
    const db = client.db("star-wars-quotes");
    const quotesCollection = db.collection("quotes");

    app.get("/", (req, res) => {
      const cursor = db
        .collection("quotes")
        .find()
        .toArray()
        .then((results) =>
          res.render(`${__dirname}/../views/index.ejs`, { quotes: results })
        )
        .catch((error) => console.error(error));
    });

    app.post("/quotes", (req, res) => {
      quotesCollection
        .insertOne(req.body)
        .then((result) => {
          console.log(result);
          res.redirect("/");
        })
        .catch((error) => console.error(error));
    });

    app.put("/quotes", (req, res) => {
      console.log(req.body);
      quotesCollection
        .findOneAndUpdate(
          { name: "yoda" },
          {
            $set: {
              name: req.body.name,
              quote: req.body.quote,
            },
          },
          { upsert: true }
        )
        .then((result) => res.json("Success"))
        .catch((error) => console.error(error));
    });

    app.delete("/quotes", (req, res) => {
      console.log(`Attempting to delete a ${req.body.name} quote...`);
      quotesCollection
        .deleteOne({ name: req.body.name })
        .then((result) => {
          if (result.deletedCount == 0)
            return res.json(
              `Could not delete a ${req.body.name} quote. None exist...`
            );
          res.json(`Deleted a ${req.body.name} quote...`);
        })
        .catch((error) => console.error(error));
    });

    console.log("Connected to DB");
  })
  .catch((err) => console.error(err));

app.listen(3000, () => {
  console.log(3000);
});
