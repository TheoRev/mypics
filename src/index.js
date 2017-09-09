'use strict'

import {
    app,
    BrowserWindow,
    ipcMain,
    dialog
} from 'electron'

import devtools from './devtools'
import fs from 'fs'
import isImage from 'is-image'
import path from 'path'
import filesize from 'filesize'

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
            const images = []
            if (dir) {
                fs.readdir(dir[0], (err, files) => {
                    if (err) throw err
                    for (var i = 0; i < files.length; i++) {
                        if (isImage(files[i])) {
                            let imageFile = path.join(dir[0], files[i])
                            let stats = fs.statSync(imageFile)
                            let size = filesize(stats.size, {
                                round: 0
                            })
                            images.push({
                                filename: files[i],
                                src: `file://${imageFile}`,
                                size: size
                            })
                        }
                    }
                    event.sender.send('load-images', images)
                })
            }
        })
})

ipcMain.on('open-save-dialog', (event) => {
    dialog.showSaveDialog(win, {
            title: 'Guardar imagen modificada',
            buttonLabel: 'Guardar imagen',
            filters: [{
                name: 'Images',
                extensions: [ext.substr(1)]
            }]
        },
        (file) => {
            event.sender.send('save-image')
        }
    )
})