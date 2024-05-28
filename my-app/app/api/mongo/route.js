import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request){
   


const uri =
  "mongodb+srv://anshika_sharma:Pulsar420@cluster0.1x5btiw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

  try {
    await client.connect();
    const database = client.db('Inventory_PCB');
    const movies = database.collection('inventory');
    // Query for a movie that has the title 'Back to the Future'
    const query = {  };
    const movie = await movies.findOne(query);
    console.log(movie);
    return NextResponse.json({"a": 34, movie})
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}




