// app/api/herbal-plants/[scientificName]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { herbalPlants } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  { params }: { params: { scientificName: string } }
) {
  try {
    const plant = await db
      .select()
      .from(herbalPlants)
      .where(eq(herbalPlants.scientificName, decodeURIComponent(params.scientificName)));

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