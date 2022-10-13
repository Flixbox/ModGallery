import type {PopulatedMod} from '../../../../types/types'
import ModTile from './ModTile'

interface ModListProps {
  mods: PopulatedMod[]
  refreshMods: () => void
}

const ModList = ({mods, refreshMods}: ModListProps) => {
  return (
    <>
      {mods.map(mod => (
        <ModTile
          mod={mod}
          refreshMods={refreshMods}
          key={mod.title}
        />
      ))}
    </>
  )
}

export default ModList
