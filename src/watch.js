import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MFLIX_DB_URI;

const client = new MongoClient(uri);

const simulateAsyncPause = () =>
  new Promise(resolve => {
    setTimeout(() => resolve(), 1000);
  });

let changeStream;
async function run() {
    try {
        await client.connect();
        const database = client.db("insertDB");
        const collection = database.collection("haikus");

        // open a Change Stream on the "haikus" collection
        changeStream = collection.watch();

        // set up a listener when change events are emitted
        changeStream.on("change", next => {
            // process any change event
            console.log("received a change to the collection: \t", next);
        });

        await simulateAsyncPause();

        await collection.insertOne({
            title: "Record of a Shriveled Datum",
            content: "No bytes, no problem. Just insert a document, in MongoDB",
        });

        await simulateAsyncPause();

        await changeStream.close();
        
        console.log("closed the change stream");
    } 
    finally {
        await client.close();
    }
}

run()
.catch((error) => {
    console.dir(error);
});
