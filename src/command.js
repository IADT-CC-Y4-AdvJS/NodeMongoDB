import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MFLIX_DB_URI;

const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();

        const db = client.db("sample_mflix");

        // find the storage statistics for the "sample_mflix" database using the 'dbStats' command
        const result = await db.command({
            dbStats: 1,
        });

        console.log(result);
    } 
    finally {
        await client.close();
    }
}

run()
.catch((error) => {
    console.dir(error);
});
