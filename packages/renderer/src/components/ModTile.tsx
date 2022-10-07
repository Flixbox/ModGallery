import {PopulatedMod} from 'types'

interface ModTileProps {
  mod: PopulatedMod
}

const ModTile = ({mod}: ModTileProps) => {
  return <>{mod.title}</>
}

export default ModTile
