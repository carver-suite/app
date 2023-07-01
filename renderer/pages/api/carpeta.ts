import electron from 'electron'
import type { NextApiResponse } from 'next'

export default async function handler(_: never, res: NextApiResponse) {
  console.log(electron.dialog)
  const folder = await electron.dialog.showOpenDialog({
    properties: ['openDirectory', 'createDirectory'],
  })
  res.status(200).send(folder.canceled ? '' : folder.filePaths[0])
}
