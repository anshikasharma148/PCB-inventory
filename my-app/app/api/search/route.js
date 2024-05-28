import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request){



const query= request.nextUrl.searchParams.get("query")

const uri =
  "mongodb+srv://anshika_sharma:Pulsar420@cluster0.1x5btiw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

  try {
    await client.connect();
    const database = client.db('stock');
    const inventory = database.collection('inventory');
      
   
    const query = {  };
    const products = await inventory.aggregate([
        {
          $match: {
            $or: [
              { toolID: { $regex: query, $options: "i" } }, // Partial matching for toolID field
              { toolname: { $regex: query, $options: "i" } }, // Partial matching for toolname field
              { cate: { $regex: query, $options: "i" } } // Partial matching for category field
            ]
          }
        }
      ]).toArray()
      
    return NextResponse.json({ success: true, products})
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}


export async function POST(request){


    let body= await request.json()

    const uri =
      "mongodb+srv://anshika_sharma:Pulsar420@cluster0.1x5btiw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
      try {
        await client.connect();
        const database = client.db('stock');
        const inventory = database.collection('inventory');
       
        const query = {  };
        const product = await inventory.insertOne(body)
        return NextResponse.json({ product, ok:true})
      } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
      }
    }





