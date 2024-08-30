import { eventSchema } from '@/app/validationSchemas'
import prisma from '@/prisma/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    // Extract search parameters from the request URL
    const { searchParams } = new URL(request.url)

    // Pagination parameters
    const skipParam = searchParams.get('skip')
    const takeParam = searchParams.get('take')
    const skip = skipParam ? parseInt(skipParam) : 0
    const take = takeParam ? parseInt(takeParam) : 5

    // Filtering parameters
    const name = searchParams.get('name')
    const type = searchParams.get('type')
    const level = searchParams.get('level')
    const containerAlias = searchParams.get('containerAlias')
    const containerId = searchParams.get('containerId')
    const containerType = searchParams.get('containerType')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    
    // Construct the 'where' filter object
    const where: any = {}

    if (name) {
        where.name = name
    }

    if (type) {
        where.type = type
    }

    if (level && ['INFO', 'WARN', 'ERROR'].includes(level)) {
        where.level = level
    }

    if (containerAlias) {
        where.containerAlias = containerAlias
    }

    if (containerId) {
        where.containerId = containerId
    }

    if (containerType) {
        where.containerType = containerType
    }

    // Add date filtering for eventTime
    if (startDate || endDate) {
        where.eventTime = {}
        if (startDate) {
            where.eventTime.gte = new Date(startDate) // Filter events from startDate onwards
        }
        if (endDate) {
            where.eventTime.lte = new Date(endDate) // Filter events up to endDate
        }
    }
    try {
        // Fetch events with pagination using 'skip' and 'take' values
        const events = await prisma.event.findMany({
            where,
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

        // Check for existing event with the same eventTime and data
        const existingEvent = await prisma.event.findFirst({
            where: {
                eventTime: validation.data.eventTime,
                data: {
                    equals: validation.data.data, // Use a nested object for JSON fields
                },
                containerId: validation.data.containerId
            },
        })

        if (existingEvent) {
            return NextResponse.json(
                {
                    error: 'Duplicate event detected',
                    details:
                        'An event with the same eventTime and data already exists.',
                },
                { status: 409 } // 409 Conflict
            )
        }

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
