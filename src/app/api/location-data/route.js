import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export async function GET() {
  try {
    const countryData = await redis.hgetall("countries");
    const formattedData = Object.keys(countryData).map((country) => ({
      country,
      points: parseInt(countryData[country], 10),
    }));

    return NextResponse.json(formattedData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch country data" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { country, points } = await request.json();

    if (!country || typeof points !== "number") {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    await redis.hincrby("countries", country, points);

    return NextResponse.json(
      { message: "Country data updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to update country data" },
      { status: 500 }
    );
  }
}
