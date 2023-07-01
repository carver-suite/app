import { app } from 'electron'
import { resolve } from 'path'
import serve from 'electron-serve'
import { createWindow } from './helpers'
import carverApi from '@mgyugcha/carver-suite-api'

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
const isProd: boolean = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
}

;(async () => {
  carverApi(resolve(app.getPath('userData'), 'database.db'))
  await app.whenReady()

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
  })

  if (isProd) {
    await mainWindow.loadURL('app://./home.html')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/`)
    mainWindow.webContents.openDevTools()
  }
})()

app.on('window-all-closed', () => {
  app.quit()
})
