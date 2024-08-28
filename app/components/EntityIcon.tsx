import React from 'react'
import { PiFarm } from "react-icons/pi";
import { GiBrain } from "react-icons/gi";
import { HiDatabase } from "react-icons/hi";
import { IoGitNetworkSharp } from "react-icons/io5";
import { FaDroplet } from "react-icons/fa6";
import { BsAirplaneEngines } from "react-icons/bs";
const DEFAULT_SIZE = '1.5rem'

const EntityIcon = ({entity, size}: {entity: string; size?: string}) => {
  if (entity === 'cluster_plotter') return <BsAirplaneEngines color='#FFB3BA' size={size || DEFAULT_SIZE} />
  if (entity === 'cluster_cache') return <HiDatabase color='#AEC6CF' size={size || DEFAULT_SIZE} />
  if (entity === 'cluster_controller') return <GiBrain color='#77DD77' size={size || DEFAULT_SIZE} />
  if (entity === 'cluster_farmer') return <PiFarm color='#CBAACB' size={size || DEFAULT_SIZE} />
  if (entity === 'nats') return <IoGitNetworkSharp color='#FFDAC1' size={size || DEFAULT_SIZE} />
  if (entity === 'node') return <FaDroplet color='#B5EAD7' size={size || DEFAULT_SIZE} />
  if (entity === 'farm') return <PiFarm color='green' size={size || DEFAULT_SIZE} />
}

export default EntityIcon