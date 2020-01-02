import { app, BrowserWindow, globalShortcut} from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    webPreferences: {webSecurity: false},
    height: 563,
    useContentSize: true,
    width: 1000,
    frame: false
  })

  // 设置全屏
  mainWindow.setFullScreen(true)
  // 注册esc键切换全屏
  globalShortcut.register('ESC',() => {
    if(mainWindow.isFullScreen()){
      mainWindow.setFullScreen(false)
    }else{
      mainWindow.setFullScreen(true)
    }
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
    if (process.env.NODE_ENV === 'development') {
        BrowserWindow.addDevToolsExtension("/Users/jfxy/Library/Application\ Support/Google/Chrome/Default/Extensions/nhdogjmejiglipccpnnnanhbledajbpd/5.3.3_0");
        // BrowserWindow.addDevToolsExtension("C:\\Users\\qingbo\\vue-devtools\\shells\\chrome");
    }
// 主进程中
    const ipcMain = require('electron').ipcMain;
    ipcMain.on('download-main-video', function(event, url) {
        console.log(url);
        mainWindow.webContents.downloadURL(url)
    });
  mainWindow.webContents.session.on('will-download', (event, item, webContents) => {
    //设置文件存放位置
    item.setSavePath('./download/'+`${item.getFilename()}`);
    item.on('updated', (event, state) => {
      if (state === 'interrupted') {
        console.log('Download is interrupted but can be resumed')
      } else if (state === 'progressing') {
        if (item.isPaused()) {
          console.log('Download is paused')
        } else {
          console.log(`Received bytes: ${item.getReceivedBytes()}`)
        }
      }
    })
    item.once('done', (event, state) => {
      if (state === 'completed') {
        console.log('Download successfully')
      } else {
        console.log(`Download failed: ${state}`)
      }
    })
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
