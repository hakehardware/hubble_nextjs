import { z } from 'zod'

// Define the enum
const LevelEnum = z.enum(['INFO', 'WARN', 'ERROR'])
const ContainerTypeEnum = z.enum([
    'NODE',
    'FARMER',
    'CLUSTER_CACHE',
    'CLUSTER_CONTROLLER',
    'CLUSTER_PLOTTER',
    'CLUSTER_FARMER',
    'NATS',
])
const ContainerStatusEnum = z.enum([
    'CREATED',
    'RESTARTING',
    'RUNNING',
    'REMOVING',
    'PAUSED',
    'EXITED',
    'DEAD',
])

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

export const containerTypeSchema = z.object({
    id: z
        .string()
        .regex(
            /^[a-f0-9]{64}$/,
            'Container ID must be a 64-character hexadecimal string'
        ),
    type: ContainerTypeEnum,
    alias: z.string().min(1).max(191),
    status: ContainerStatusEnum,
    image: z.string(),
    startedAt: z.preprocess((arg) => {
        if (typeof arg === 'string') {
            return new Date(arg)
        }
        return arg
    }, z.date()),
    ip: z.string(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
})

// Validation schema for the Node model
export const nodeSchema = z.object({
    containerId: z
        .string()
        .regex(
            /^[a-f0-9]{64}$/,
            'Container ID must be a 64-character hexadecimal string'
        ),
    createdAt: z.date().optional().default(new Date()), // Default value is set to now
    updatedAt: z.date().optional().default(new Date()), // Automatically updated
})

// Validation schema for the Farmer model
export const farmerSchema = z.object({
    containerId: z
        .string()
        .regex(
            /^[a-f0-9]{64}$/,
            'Container ID must be a 64-character hexadecimal string'
        ),
    createdAt: z.date().optional().default(new Date()), // Default value is set to now
    updatedAt: z.date().optional().default(new Date()), // Automatically updated
})

// Validation schema for the ClusterController model
export const clusterControllerSchema = z.object({
    containerId: z
        .string()
        .regex(
            /^[a-f0-9]{64}$/,
            'Container ID must be a 64-character hexadecimal string'
        ),
    createdAt: z.date().optional().default(new Date()), // Default value is set to now
    updatedAt: z.date().optional().default(new Date()), // Automatically updated
})

// Validation schema for the ClusterCache model
export const clusterCacheSchema = z.object({
    containerId: z
        .string()
        .regex(
            /^[a-f0-9]{64}$/,
            'Container ID must be a 64-character hexadecimal string'
        ),
    createdAt: z.date().optional().default(new Date()), // Default value is set to now
    updatedAt: z.date().optional().default(new Date()), // Automatically updated
})

// Validation schema for the ClusterFarmer model
export const clusterFarmerSchema = z.object({
    containerId: z
        .string()
        .regex(
            /^[a-f0-9]{64}$/,
            'Container ID must be a 64-character hexadecimal string'
        ),
    createdAt: z.date().optional().default(new Date()), // Default value is set to now
    updatedAt: z.date().optional().default(new Date()), // Automatically updated
})

// Validation schema for the ClusterPlotter model
export const clusterPlotterSchema = z.object({
    containerId: z
        .string()
        .regex(
            /^[a-f0-9]{64}$/,
            'Container ID must be a 64-character hexadecimal string'
        ),
    createdAt: z.date().optional().default(new Date()), // Default value is set to now
    updatedAt: z.date().optional().default(new Date()), // Automatically updated
})
