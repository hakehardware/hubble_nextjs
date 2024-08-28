'use client'
import React, { useEffect, useState } from 'react'
import {
    Box,
    Card,
    Flex,
    Heading,
    Progress,
    Table,
    Text,
} from '@radix-ui/themes'
import EntityIcon from './components/EntityIcon'
import DateBadge from './components/DateBadge'
import { Event } from '@prisma/client'
import NewEventBadge from './components/NewEventBadge'

const LatestEvents = () => {
    // const events = await prisma.event.findMany({
    //     take: 10,
    //     orderBy: { eventTime: 'desc' },
    // })

    const [events, setEvents] = useState<Event[]>([])
    const [lastUpdated, setLastUpdated] = useState<string>('')
    const [countdown, setCountdown] = useState<number>(10) // State for countdown

    useEffect(() => {
        const getEvents = async () => {
            const readableDate = new Date().toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
            })

            setLastUpdated(readableDate)

            const response = await fetch('/api/events')
            if (!response.ok) {
                console.error('Failed to fetch events')
                return
            }

            const data = await response.json()
            setEvents(data)
        }

        getEvents()

        // Set up interval to decrement the countdown and refresh data every 10 seconds
        const countdownInterval = setInterval(() => {
            setCountdown((prev) => {
                if (prev === 1) {
                    getEvents() // Refresh data when countdown reaches 1
                    return 10 // Reset countdown to 10
                }
                return prev - 1 // Decrement countdown
            })
        }, 1000) // Update every second

        // Cleanup interval on component unmount
        return () => clearInterval(countdownInterval)
    }, [])

    const progressValue = ((10 - countdown) / 10) * 100

    return (
        <Card>
            <Flex justify="between">
                <Heading size="4" mb="5">
                    Latest Events
                </Heading>
                <Flex direction="column" gap="2">
                    <Text size="2">Refreshes In: {countdown}</Text>
                    <Box maxWidth="100px">
                        <Progress value={progressValue} />
                    </Box>
                </Flex>
            </Flex>

            <Table.Root>
                <Table.Body>
                    {events.map((event) => (
                        <Table.Row key={event.id}>
                            <Table.Cell>
                                <Flex align="center" gap="5">
                                    <EntityIcon entity={event.containerType} />
                                    <Flex
                                        direction="column"
                                        align="start"
                                        gap="1"
                                    >
                                        <Flex gap="4">
                                            <NewEventBadge
                                                dateString={event.eventTime}
                                            />
                                            <Text weight="bold">
                                                {event.name}{' '}
                                            </Text>
                                        </Flex>

                                        <Text>{event.containerAlias}</Text>
                                        <pre
                                            style={{
                                                whiteSpace: 'pre-wrap',
                                                wordBreak: 'break-word',
                                                background: '#f6f8fa',
                                                padding: '5px',
                                                borderRadius: '5px',
                                                fontSize: "0.8rem"
                                            }}
                                        >
                                            {JSON.stringify(event.data)}
                                        </pre>

                                        <DateBadge
                                            dateString={event.eventTime}
                                        />
                                    </Flex>
                                </Flex>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </Card>
    )
}

export default LatestEvents
