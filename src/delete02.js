import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MFLIX_DB_URI;

const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();

        const database = client.db("sample_mflix");
        const movies = database.collection("movies");

        // Query for all movies with a title containing the string "Santa"
        const query = { title: { $regex: "Santa" } };

        const result = await movies.deleteMany(query);

        console.log("Deleted " + result.deletedCount + " documents");
    } 
    finally {
        await client.close();
    }
}

run()
.catch((error) => {
    console.dir(error);
});
