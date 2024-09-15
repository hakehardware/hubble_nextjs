'use client'
import React, { useEffect, useState } from 'react'
import {
    Box,
    Card,
    Flex,
    Grid,
    Heading,
    Separator,
    Text,
} from '@radix-ui/themes'
import { Container } from '@prisma/client'
import EntityIcon from './components/EntityIcon'

interface ContainerAggregates {
    farmerCount: number
    nodeCount: number
    clusterFarmerCount: number
    clusterControllerCount: number
    clusterPlotterCount: number
    clusterCacheCount: number
    natsCount: number
    running: number
    notRunning: number
}

const ContainerCounts = () => {
    const [containers, setContainers] = useState<Container[]>([])
    const [aggregates, setAggregates] = useState<ContainerAggregates | null>(
        null
    )

    useEffect(() => {
        const getContainers = async () => {
            const response = await fetch('/api/containers')
            if (!response.ok) {
                console.error('Failed to fetch events')
                return
            }

            const data = await response.json()
            setContainers(data.containers)
            setAggregates(data.aggregates)
        }

        getContainers()
    }, [])

    const getAggregateBox = (aggType: string, aggCount: number) => {
        let aggregateName
        let aggregateTitle

        if (aggType === 'farmerCount') {
            aggregateName = 'FARMER'
            aggregateTitle = 'Farmers'
        } else if (aggType === 'nodeCount') {
            aggregateName = 'NODE'
            aggregateTitle = 'Nodes'
        } else if (aggType === 'clusterFarmerCount') {
            aggregateName = 'CLUSTER_FARMER'
            aggregateTitle = 'Cluster Farmers'
        } else if (aggType === 'clusterControllerCount') {
            aggregateName = 'CLUSTER_CONTROLLER'
            aggregateTitle = 'Cluster Controllers'
        } else if (aggType === 'clusterPlotterCount') {
            aggregateName = 'CLUSTER_PLOTTER'
            aggregateTitle = 'Cluster Plotters'
        } else if (aggType === 'clusterCacheCount') {
            aggregateName = 'CLUSTER_CACHE'
            aggregateTitle = 'Cluster Cache'
        } else if (aggType === 'natsCount') {
            aggregateName = 'NATS'
            aggregateTitle = 'Nats'
        }

        if (!aggregateName || !aggregateTitle) return null

        return (
            <Box className="border rounded-md p-4" width="100%" height="100%">
                <Flex gap="3" align="center" justify="start" height='100%'>
                    <EntityIcon entity={aggregateName} />
                    <Box width='100%' height='100%'>
                        <Flex direction="column" align="center" gap="2" justify='center'>
                            <Text weight="bold" size="2" align="center">
                                {aggregateTitle}
                            </Text>
                            <Separator size="3" />
                            <Text weight="bold" size="4">
                                {aggCount}
                            </Text>
                        </Flex>
                    </Box>
                </Flex>
            </Box>
        )
    }

    return (
        <Box className="p-5 md:pl-5">
            <Heading size="4" mb="5">
                Containers
            </Heading>
            <Grid gap="2" columns={{ initial: '1', sm: '2', md: '3' }}>
                {aggregates &&
                    Object.entries(aggregates).map(([key, value]) =>
                        getAggregateBox(key, value)
                    )}
            </Grid>
        </Box>
    )
}

export default ContainerCounts
