import {PopulatedMod, UnpopulatedMod} from 'types'
import {stringify} from 'query-string'

export const fetchModDataSteam = async (mods: UnpopulatedMod[]) => {
  const modsWithId = mods.filter(mod => mod.publishedfileid)
  const publishedfileids = modsWithId.map(mod => mod.publishedfileid)
  const res = await fetch(
    'https://api.steampowered.com/ISteamRemoteStorage/GetPublishedFileDetails/v1/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: stringify(
        {
          itemcount: publishedfileids.length.toString(),
          publishedfileids,
        },
        {arrayFormat: 'index'},
      )
        .replaceAll('[', '%5B')
        .replaceAll(']', '%5D'),
    },
  ).then(res => res.json())
  return res.response.publishedfiledetails as PopulatedMod[]
}
