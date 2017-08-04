'use strict'

import {
    app,
    BrowserWindow
} from 'electron'

import devtools from './devtools'

if (process.env.NODE_ENV === 'development') {
    devtools()
}

app.on('ready', () => {
    let win = new BrowserWindow({
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

    win.toggleDevTools()
})