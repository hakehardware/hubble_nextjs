import { containerTypeSchema } from '@/app/validationSchemas'
import prisma from '@/prisma/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)

    // Pagination parameters
    const skipParam = searchParams.get('skip')
    const takeParam = searchParams.get('take')
    const skip = skipParam ? parseInt(skipParam) : 0
    const take = takeParam ? parseInt(takeParam) : 5

    // Filtering parameters
    const id = searchParams.get('id')
    const type = searchParams.get('type')
    const alias = searchParams.get('alias')
    const status = searchParams.get('status')

    const where: any = {}
    if (id) {
        where.id = id
    }
    if (type) {
        where.type = type
    }
    if (alias) {
        where.alias = alias
    }
    if (status) {
        where.status = status
    }

    try {
        const containers = await prisma.container.findMany({
            where,
            orderBy: { alias: 'desc' },
            skip,
            take,
        })

        const farmerCount = await prisma.container.count({
            where: {
                type: 'FARMER',
            },
        })
        const nodeCount = await prisma.container.count({
            where: {
                type: 'NODE',
            },
        })
        const clusterFarmerCount = await prisma.container.count({
            where: {
                type: 'CLUSTER_FARMER',
            },
        })
        const clusterControllerCount = await prisma.container.count({
            where: {
                type: 'CLUSTER_CONTROLLER',
            },
        })
        const clusterPlotterCount = await prisma.container.count({
            where: {
                type: 'CLUSTER_PLOTTER',
            },
        })
        const clusterCacheCount = await prisma.container.count({
            where: {
                type: 'CLUSTER_CACHE',
            },
        })
        const natsCount = await prisma.container.count({
            where: {
                type: 'NATS',
            },
        })

        const running = await prisma.container.count({
            where: {
                status: 'RUNNING',
            },
        })

        const notRunning = await prisma.container.count({
            where: {
                status: {
                    not: 'RUNNING',
                }
            },
        })

        return NextResponse.json({
            containers,
            aggregates: {
                farmerCount,
                nodeCount,
                clusterFarmerCount,
                clusterControllerCount,
                clusterPlotterCount,
                clusterCacheCount,
                natsCount,
                running,
                notRunning
            }
        })

    } catch (error) {
        console.error('Failed to fetch containers:', error)
        return NextResponse.json(
            { error: 'Failed to fetch containers' },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const validation = containerTypeSchema.safeParse(body)

        if (!validation.success)
            return NextResponse.json(validation.error.format(), {
                status: 400,
            })

        const container = await prisma.container.upsert({
            where: { id: validation.data.id },
            update: {
                type: validation.data.type,
                alias: validation.data.alias,
                status: validation.data.status,
                image: validation.data.image,
                startedAt: validation.data.startedAt,
                ip: validation.data.ip,
            },
            create: {
                id: validation.data.id,
                type: validation.data.type,
                alias: validation.data.alias,
                status: validation.data.status,
                image: validation.data.image,
                startedAt: validation.data.startedAt,
                ip: validation.data.ip,
            },
        })

        return NextResponse.json(container, { status: 201 })
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Failed to upsert container', details: error.message },
            { status: 500 }
        )
    }
}
