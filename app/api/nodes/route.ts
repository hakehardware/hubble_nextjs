import { nodeSchema } from '@/app/validationSchemas'
import prisma from '@/prisma/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)

    // Pagination parameters
    const skipParam = searchParams.get('skip')
    const takeParam = searchParams.get('take')
    const skip = skipParam ? parseInt(skipParam) : 0
    const take = takeParam ? parseInt(takeParam) : 5

    const containerId = searchParams.get('containerId')

    const where: any = {}
    if (containerId) {
        where.containerId = containerId
    }

    try {
        const nodes = await prisma.node.findMany({
            where,
            orderBy: { containerId: 'desc' },
            include: {
                container: true
            },
            skip,
            take,
        })

        const totalCount = await prisma.node.count({
            where,
        })

        return NextResponse.json({
            nodes,
            totalCount,
        })
    } catch (error) {
        console.error('Failed to fetch nodes:', error)
        return NextResponse.json(
            { error: 'Failed to fetch nodes' },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const validation = nodeSchema.safeParse(body)

        if (!validation.success)
            return NextResponse.json(validation.error.format(), {
                status: 400,
            })

        const node = await prisma.node.upsert({
            where: { containerId: validation.data.containerId },
            update: {},
            create: {
                containerId: validation.data.containerId,
            },
        })

        return NextResponse.json(node, { status: 201 })
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Failed to upsert container', details: error.message },
            { status: 500 }
        )
    }
}
