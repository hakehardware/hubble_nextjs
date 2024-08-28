import React from 'react'
import { Badge } from '@radix-ui/themes'

const DateBadge = ({ dateString }: { dateString: Date }) => {
    return <Badge color="gray">{dateString.toLocaleString()}</Badge>
}

export default DateBadge
