import React from 'react'
import { PiFarm } from 'react-icons/pi'
import { GiBrain } from 'react-icons/gi'
import { HiDatabase } from 'react-icons/hi'
import { IoGitNetworkSharp } from 'react-icons/io5'
import { FaDroplet } from 'react-icons/fa6'
import { BsAirplaneEngines } from 'react-icons/bs'
import { BiCrown } from "react-icons/bi";
import { GiAbstract029, GiAbstract030, GiAbstract089, GiBrainDump, GiCircleForest, GiClawHammer, GiFallingLeaf, GiChest } from "react-icons/gi";

const DEFAULT_SIZE = '2em'

const EntityIcon = ({ entity, size }: { entity: string; size?: string }) => {
    if (typeof window !== 'undefined' && window.innerWidth < 480) {
        return null
    }

    if (entity === 'CLUSTER_PLOTTER')
        return <GiAbstract029 color="#FFB3BA" size={DEFAULT_SIZE} />
    if (entity === 'CLUSTER_CACHE')
        return <GiChest color="#AEC6CF" size={DEFAULT_SIZE} />
    if (entity === 'CLUSTER_CONTROLLER')
        return <GiBrainDump color="#77DD77" size={DEFAULT_SIZE} />
    if (entity === 'CLUSTER_FARMER')
        return <GiFallingLeaf color="#CBAACB" size={DEFAULT_SIZE} />
    if (entity === 'NATS')
        return <GiAbstract089 color="#FFDAC1" size={DEFAULT_SIZE} />
    if (entity === 'NODE')
        return <GiAbstract030 color="#B5EAD7" size={DEFAULT_SIZE} />
    if (entity === 'FARMER') return <GiClawHammer color="green" size={DEFAULT_SIZE} />
    if (entity === 'FARM') return <GiCircleForest color="purple" size={DEFAULT_SIZE} />
}

export default EntityIcon
