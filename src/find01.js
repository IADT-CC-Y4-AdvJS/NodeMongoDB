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

        // Query for a movie that has the title 'The Room'
        const query = { title: "The Room" };

        const options = {
            // sort matched documents in descending order by rating
            sort: { "imdb.rating": -1 },
            // Include only the `title` and `imdb` fields in the returned document
            projection: { _id: 0, title: 1, imdb: 1 },
        };

        const movie = await movies.findOne(query, options);

        // since this method returns the matched document, not a cursor, print it directly
        console.dir(movie);
    } 
    finally {
        await client.close();
    }
}

run()
.catch((error) => {
    console.dir(error);
});
