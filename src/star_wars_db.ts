import { MongoClient } from "mongodb";

MongoClient.connect("mongodb://localhost:27017/star-wars-quotes", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((client) => {
    console.log("Connected to DB");
    const db = client.db("star-wars-quotes");
  })
  .catch((err) => console.error(err));
