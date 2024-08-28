import { eventSchema } from '@/app/validationSchemas'
import prisma from '@/prisma/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    // Extract search parameters from the request URL
    const { searchParams } = new URL(request.url)

    // Get 'skip' and 'take' parameters, providing default values if they are null
    const skipParam = searchParams.get('skip')
    const takeParam = searchParams.get('take')

    // Parse the parameters, providing defaults if they are null or cannot be parsed to an integer
    const skip = skipParam ? parseInt(skipParam) : 0 // Default to 0 if not provided
    const take = takeParam ? parseInt(takeParam) : 10 // Default to 10 if not provided

    try {
        // Fetch events with pagination using 'skip' and 'take' values
        const events = await prisma.event.findMany({
            orderBy: { eventTime: 'desc' },
            skip, // Skip the number of records as specified
            take, // Limit the number of records as specified
        })

        return NextResponse.json(events)
    } catch (error) {
        console.error('Failed to fetch events:', error)
        return NextResponse.json(
            { error: 'Failed to fetch events' },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const validation = eventSchema.safeParse(body)

        if (!validation.success)
            return NextResponse.json(validation.error.format(), {
                status: 400,
            })

        const newEvent = await prisma.event.create({
            data: validation.data,
        })

        return NextResponse.json(newEvent, { status: 201 })
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Failed to create event', details: error.message },
            { status: 500 }
        )
    }
}
