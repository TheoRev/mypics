import {
    setIpc,
    openDirectory,
    saveFile
} from './ipcRendererEvents'

import {
    addImagesEvents,
    searchImagesEvent,
    selectEvent
} from './images-ui'

window.addEventListener('load', () => {
    setIpc()
    addImagesEvents()
    searchImagesEvent()
    selectEvent()
    buttonEvent('open-directory', openDirectory)
    buttonEvent('save-button', saveFile)
})

function buttonEvent(id, func) {
    const openDir = document.getElementById(id)
    openDir.addEventListener('click', func)
}