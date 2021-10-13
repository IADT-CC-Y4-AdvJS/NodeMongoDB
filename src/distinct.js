import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MFLIX_DB_URI;

const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();

        // define a database and collection on which to run the method
        const database = client.db("sample_mflix");
        const movies = database.collection("movies");

        // specify the document field
        const fieldName = "year";

        // specify an optional query document
        const query = { directors: "Barbra Streisand" };

        const distinctValues = await movies.distinct(fieldName, query);

        console.log(distinctValues);
    } 
    finally {
        await client.close();
    }
}

run()
.catch((error) => {
    console.dir(error);
});
