import { Badge } from '@radix-ui/themes'
import React from 'react'

const NewEventBadge = ({ dateString }: { dateString: Date }) => {
    const now = Date.now() // Current time in milliseconds
    const oneHourAgo = now - 60 * 60 * 1000 // One hour ago in milliseconds
    const date = new Date(dateString)

    // Display the badge only if the date is within the last hour
    if (date.getTime() >= oneHourAgo) {
        return <Badge color="blue">New</Badge>
    }

    // Return null if the date is not within the last hour
    return null
}

export default NewEventBadge
