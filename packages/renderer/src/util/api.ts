import {Mod} from 'types'
import {stringify} from 'query-string'

export const fetchModDataSteam = async (mods: Mod[]) => {
  const modIds = mods.map(mod => mod.workshopId)
  return await fetch(
    'https://api.steampowered.com/ISteamRemoteStorage/GetPublishedFileDetails/v1/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: stringify(
        {
          itemcount: modIds.length.toString(),
          publishedfileids: modIds,
        },
        {arrayFormat: 'index'},
      )
        .replaceAll('[', '%5B')
        .replaceAll(']', '%5D'),

      mode: 'no-cors',
    },
  )
}
