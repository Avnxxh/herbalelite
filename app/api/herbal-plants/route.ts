import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { herbalPlants } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const allPlants = await db.select().from(herbalPlants);
    return NextResponse.json(allPlants);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching herbal plants" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const plantData = await request.json();
    
    const newPlant = await db
      .insert(herbalPlants)
      .values(plantData)
      .returning();

    return NextResponse.json(newPlant[0], { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating herbal plant" },
      { status: 500 }
    );
  }
}