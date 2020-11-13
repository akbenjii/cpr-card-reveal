const {app, BrowserWindow} = require('electron');

function createWindow() {
    const win = new BrowserWindow({
        width: 600,
        height: 400,
        title: 'CPR Card Revealer',
        icon: './src/img/ico-ver.ico',
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        },
    });

    win.loadFile('./src/interface/menu.html').then(r => console.log('Loaded...'));

    win.resizable = false;
    win.menuBarVisible = false;
}

app.allowRendererProcessReuse = false;
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

global.data = {
    ipv4: null
};
