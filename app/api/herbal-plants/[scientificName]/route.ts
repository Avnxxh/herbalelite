// app/api/herbal-plants/[scientificName]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { herbalPlants } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ scientificName: string }> }
) {
  try {
    // Await the params to get the scientificName
    const { scientificName } = await context.params;
    
    const plant = await db
      .select()
      .from(herbalPlants)
      .where(eq(herbalPlants.scientificName, decodeURIComponent(scientificName)));

    if (plant.length === 0) {
      return NextResponse.json(
        { error: "Plant not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(plant[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching plant" },
      { status: 500 }
    );
  }
}