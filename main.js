const { app, BrowserWindow } = require('electron')
const path = require('path')
const { Menu } = require('electron')
const menuBar = [
  {
    label: '文件',
    submenu: [
      { label: '打开' },
      { label: '保存' },
      {
        label: '退出',
        click() {
          app.quit();
        }
      }
    ]
  },
  {
    label: '编辑',
    submenu: [
      {
        label: '撤销',
        accelerator: 'CmdOrCtrl+Z',
        role: 'undo'
      },
      {
        label: '重做',
        accelerator: 'Shift+CmdOrCtrl+Z',
        role: 'redo'
      },
    ]
  },
  { label: '运行' },
  { label: '调试' },
  {
    label: '提交',
    submenu: [
      { label: '' },
    ]
  },
  { label: '配置' },
  {
    label: '帮助',
    submenu: [
      { label: '关于' }
    ]
  }
];
const menu = Menu.buildFromTemplate(menuBar);
Menu.setApplicationMenu(menu);

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      enableRemoteModule: true,
      nodeIntegrationInSubFrames: true
    }
  })
  mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})