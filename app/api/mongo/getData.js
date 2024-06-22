import { MongoClient } from "mongodb";

const uri = process.env.MONGO;

const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await client.connect();
      const database = client.db("learnStock");
      const collection = database.collection("c1");

      const data = await collection.find({}).toArray();
      console.log(data);

      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    } finally {
      await client.close();
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
