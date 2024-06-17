import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

// MongoDB connection URI and options
const uri = "mongodb+srv://anshika_sharma:Pulsar420@cluster0.1x5btiw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Function to connect to MongoDB
async function connectToDB() {
  const client = new MongoClient(uri, options);
  await client.connect();
  const database = client.db('stock');
  const inventory = database.collection('inventory');
  return { client, inventory };
}

// GET handler to fetch all products
export async function GET(request) {
  const { client, inventory } = await connectToDB();
  try {
    const products = await inventory.find({}).toArray();
    return NextResponse.json({ success: true, products });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  } finally {
    await client.close();
  }
}

// POST handler to add a new product
export async function POST(request) {
  const { client, inventory } = await connectToDB();
  try {
    const body = await request.json();
    const result = await inventory.insertOne(body);
    return NextResponse.json({ success: true, product: result.ops[0] });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  } finally {
    await client.close();
  }
}

// DELETE handler to remove a product by toolID
export async function DELETE(request) {
  const { client, inventory } = await connectToDB();
  try {
    // Extract toolID from query parameters
    const url = new URL(request.url);
    const toolID = url.searchParams.get('toolID');

    if (!toolID) {
      return NextResponse.json({ success: false, message: "toolID is required" }, { status: 400 });
    }

    const result = await inventory.deleteOne({ toolID: toolID });
    if (result.deletedCount === 1) {
      return NextResponse.json({ success: true, message: "Product deleted successfully" });
    } else {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  } finally {
    await client.close();
  }
}
