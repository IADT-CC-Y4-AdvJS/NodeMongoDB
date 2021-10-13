import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MFLIX_DB_URI;

const client = new MongoClient(uri);

async function run() {
  try {
        await client.connect();

        const database = client.db("insertDB");
        const foods = database.collection("foods");

        // create an array of documents to insert
        const docs = [
            { name: "cake", healthy: false },
            { name: "lettuce", healthy: true },
            { name: "donut", healthy: false }
        ];

        // this option prevents additional documents from being inserted if one fails
        const options = { ordered: true };

        const result = await foods.insertMany(docs, options);
        console.log(`${result.insertedCount} documents were inserted`);
    } 
    finally {
        await client.close();
    }
}

run()
.catch((error) => {
    console.dir(error);
});
