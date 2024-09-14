import { containerTypeSchema } from '@/app/validationSchemas'
import prisma from '@/prisma/db'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const validation = containerTypeSchema.safeParse(body)

        if (!validation.success)
            return NextResponse.json(validation.error.format(), {
                status: 400,
            })


        const container = await prisma.container.upsert({
            where: {id: validation.data.id},
            update: {
                type: validation.data.type,
                alias: validation.data.alias,
                status: validation.data.status,
                image: validation.data.image,
                startedAt: validation.data.startedAt,
                ip: validation.data.ip
            },
            create: {
                id: validation.data.id,
                type: validation.data.type,
                alias: validation.data.alias,
                status: validation.data.status,
                image: validation.data.image,
                startedAt: validation.data.startedAt,
                ip: validation.data.ip
            }
        })

        return NextResponse.json(container, {status: 201})
        
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Failed to upsert container', details: error.message },
            { status: 500 }
        )
    }
}