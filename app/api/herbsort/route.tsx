// app/api/herbal-plants/route.ts
import { NextRequest } from 'next/server'
import { db } from '@/lib/db'
import { herbalPlants } from '@/lib/db/schema'
import { asc, desc } from 'drizzle-orm'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const sortBy = searchParams.get('sortBy') || 'commonName'
  const sortOrder = searchParams.get('sortOrder') || 'asc'

  try {
    let query = db.select().from(herbalPlants)
    
    // Apply sorting
    if (sortBy === 'commonName') {
    //@ts-ignore
      query = sortOrder === 'asc' 
        ? query.orderBy(asc(herbalPlants.commonName)) 
        : query.orderBy(desc(herbalPlants.commonName))
    } else if (sortBy === 'scientificName') {
    //@ts-ignore
      query = sortOrder === 'asc' 
        ? query.orderBy(asc(herbalPlants.scientificName)) 
        : query.orderBy(desc(herbalPlants.scientificName))
    } else if (sortBy === 'createdAt') {
        //@ts-ignore
      query = sortOrder === 'asc' 
        ? query.orderBy(asc(herbalPlants.createdAt)) 
        : query.orderBy(desc(herbalPlants.createdAt))
    }

    const plants = await query
    return new Response(JSON.stringify(plants), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch plants' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}