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

        // create a filter to update all movies with a 'G' rating
        const filter = { rated: "G" };

        // increment every document matching the filter with 2 more comments
        const updateDoc = {
            $set: {
                random_review: `After viewing I am ${100 * Math.random()}% more satisfied with life.`,
            },
        };
        const result = await movies.updateMany(filter, updateDoc);
        
        console.log(`Updated ${result.modifiedCount} documents`);
    } 
    finally {
        await client.close();
    }
}

run()
.catch((error) => {
    console.dir(error);
});
