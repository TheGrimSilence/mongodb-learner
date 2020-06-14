import { MongoClient } from "mongodb";

MongoClient.connect(
  "mongodb://localhost:27017/",
  {
    useUnifiedTopology: true,
  },
  (err, db) => {
    if (err) throw err;

    const testyDB = db.db("testyDB");

    testyDB
      .collection("customers")
      .insertOne({ name: "Blackfall Labs", founder: "Grim" }, (err, res) => {
        if (err) throw err;

        console.log("1 document created...");

        db.close();
      });
  }
);
