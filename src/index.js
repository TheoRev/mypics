'use strict'

import {
    app,
    BrowserWindow,
    ipcMain,
    dialog
} from 'electron'

import devtools from './devtools'

let win

if (process.env.NODE_ENV === 'development') {
    devtools()
}

app.on('ready', () => {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        title: 'Hola Mundo',
        center: true,
        maximizable: true,
        show: false
    })

    win.on('move', () => {
        const position = win.getPosition()
            // console.log(`la posicion es: ${position}`);
    })

    win.once('ready-to-show', () => {
        win.show()
    })

    win.on('closed', () => {
        win = null
            // console.log("saliendo de la app")
        app.quit()
    })

    // url externa
    // win.loadURL('http://devdocs.io')

    // url local
    win.loadURL(`file://${__dirname}/renderer/index.html`)

    // win.toggleDevTools()
})

ipcMain.on('open-directory', (event) => {
    dialog.showOpenDialog(win, {
            title: 'Seleccione la nueva ubicación',
            buttonLabel: 'Abrir ubicación',
            properties: ['openDirectory']
        },
        (dir) => {
            console.log(dir)
        })
})