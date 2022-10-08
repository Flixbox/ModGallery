import {PopulatedMod} from '../../../../types/types'
import ModTile from './ModTile'

interface ModListProps {
  mods: PopulatedMod[]
}

const ModList = ({mods}: ModListProps) => {
  return (
    <>
      {mods.map(mod => (
        <ModTile mod={mod} />
      ))}
    </>
  )
}

export default ModList
