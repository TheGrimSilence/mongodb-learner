import { MongoClient } from "mongodb";

MongoClient.connect(
  "mongodb://localhost:27017/",
  { useUnifiedTopology: true },
  (err, db) => {
    if (err) throw err;

    const testyDB = db.db("testyDB");

    testyDB.collection("customers").insertMany(
      [
        { name: "Ebongarde", founder: "Grim" },
        { name: "Xploration", founder: "Grim" },
        { name: "Futrium", founder: "Grim" },
      ],
      (err, res) => {
        if (err) throw err;

        console.log(`Created multiple (${res.insertedCount}) entries...`);

        db.close();
      }
    );
  }
);
