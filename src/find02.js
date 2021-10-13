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

        // query for movies that have a runtime less than 15 minutes
        const query = { runtime: { $lt: 15 } };

        const options = {
            // sort returned documents in ascending order by title (A->Z)
            sort: { title: 1 },
            // Include only the `title` and `imdb` fields in each returned document
            projection: { _id: 0, title: 1, imdb: 1 },
        };

        const cursor = movies.find(query, options);

        // print a message if no documents were found
        if ((await cursor.count()) === 0) {
            console.log("No documents found!");
        }

        // replace console.dir with your callback to access individual elements
        await cursor.forEach(console.dir);
    } 
    finally {
        await client.close();
    }
}

run()
.catch((error) => {
    console.dir(error);
});
