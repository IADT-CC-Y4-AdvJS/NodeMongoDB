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

        // create a query for a movie to update
        const query = { title: { $regex: "The Cat from" } };
        // create a new document that will be used to replace the existing document
        const replacement = {
            title: `The Cat from Sector ${Math.floor(Math.random() * 1000) + 1}`,
        };

        const result = await movies.replaceOne(query, replacement);
        
        console.log(`Modified ${result.modifiedCount} document(s)`);
    } 
    finally {
        await client.close();
    }
}

run()
.catch((error) => {
    console.dir(error);
});
