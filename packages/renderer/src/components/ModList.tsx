import type {PopulatedMod} from '../../../../types/types'
import ModTile from './ModTile'

interface ModListProps {
  mods: PopulatedMod[]
  refreshMods: () => void
  type?: 'mods' | 'maps'
}

const ModList = ({mods, refreshMods, type = 'mods'}: ModListProps) => {
  return (
    <>
      {mods.map(mod => (
        <ModTile
          mod={mod}
          refreshMods={refreshMods}
          type={type}
          key={mod.title}
        />
      ))}
    </>
  )
}

export default ModList
