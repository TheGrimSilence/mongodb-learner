import { MongoClient } from "mongodb";

MongoClient.connect(
  "mongodb://localhost:27017/",
  {
    useUnifiedTopology: true,
  },
  (err, db) => {
    if (err) throw err;

    const testyDB = db.db("testyDB");

    testyDB.createCollection("customers", (err, res) => {
      if (err) throw err;

      console.log("Collection created...");

      db.close();
    });
  }
);
