import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const uri = process.env.MONGO;
const client = new MongoClient(uri);

export async function POST(request) {
  try {
    await client.connect();
    const body = await request.json();
    const database = client.db("learnStock");
    const collection = database.collection("c1");

    const result = await collection.insertOne(body);

    console.log(result);

    return NextResponse.json({
      message: "Document inserted successfully",
      result: result,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error inserting document", error: error.message },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}

export async function GET(request) {
  try {
    await client.connect();
    const database = client.db("learnStock");
    const collection = database.collection("c1");
    const result = await collection.find().toArray();
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching documents", error: error.message },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
