'use strict';

const electron = require('electron');
const electronConfig = require('electron-config');

const appConfig = require('./configs/application.json');

let mainWindow = null;

{
    const app = electron.app;
    const BrowserWindow = electron.BrowserWindow;

    const debug = process.argv.indexOf('--debug') !== -1 ? true : false;

    function createWindow() {
        const config = new electronConfig({name: 'application', defaults: appConfig.defaults});
        const windowBounds = config.get('windowBounds');
        mainWindow = new BrowserWindow({
            title: appConfig.title,
            icon: `${__dirname}/images/app-icons/opendesktop-app.png`,
            x: windowBounds.x,
            y: windowBounds.y,
            width: windowBounds.width,
            height: windowBounds.height
        });
        //mainWindow.setBounds(config.get('windowBounds'));
        mainWindow.loadURL(`file://${__dirname}/index.html`);

        if (debug) {
            mainWindow.webContents.openDevTools();
        }
        else {
            mainWindow.setMenu(null);
        }

        mainWindow.on('close', () => {
            const config = new electronConfig({name: 'application'});
            config.set('windowBounds', mainWindow.getBounds());
        });

        mainWindow.on('closed', () => {
            mainWindow = null;
        });
    }

    app.on('ready', createWindow);

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });

    app.on('activate', () => {
        if (mainWindow === null) {
            createWindow();
        }
    });
}
