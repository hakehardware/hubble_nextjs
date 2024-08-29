import React from 'react'
import { Badge } from '@radix-ui/themes'

const DateBadge = ({ dateString }: { dateString: Date }) => {
    const date = new Date(dateString)
    return <Badge color="gray">{date.toLocaleString()}</Badge>
}

export default DateBadge
