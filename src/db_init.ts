import { MongoClient } from "mongodb";

MongoClient.connect(
  "mongodb://localhost:27017/testydb",
  {
    useUnifiedTopology: true,
  },
  (err, db) => {
    if (err) throw err;

    const testyDB = db.db("testyDB");

    console.log("testyDB created...");

    db.close();
  }
);
