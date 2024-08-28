import { z } from 'zod'

// Define the enum for Level
const LevelEnum = z.enum(['INFO', 'WARN', 'ERROR'])

// Define the schema for the Event model
export const eventSchema = z.object({
    id: z.number().int().positive().optional(),
    name: z.string().min(1).max(191),
    type: z.string().min(1).max(191),
    level: LevelEnum,
    containerAlias: z.string().min(1).max(191),
    containerId: z.string().min(1).max(191),
    containerType: z.string().min(1).max(191),
    data: z.object({}).passthrough(),
    eventTime: z.preprocess((arg) => {
        if (typeof arg === 'string') {
            return new Date(arg)
        }
        return arg
    }, z.date()), // Ensure this is a Date object
    createdAt: z.date().optional(), // Optional because it defaults to now()
})
