import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MFLIX_DB_URI;

const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const database = client.db('sample_mflix');
        const movies = database.collection('movies');

        // Query for a movie that has the title 'Back to the Future'
        const query = { title: 'Back to the Future' };
        const movie = await movies.findOne(query);

        console.dir(movie);
    }
    finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

run()
.catch((error) => {
    console.dir(error);
});