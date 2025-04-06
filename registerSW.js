import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
    onNeedRefresh() {
      updateSW(true) // automatisch updaten
    },
    onOfflineReady() {
      console.log("App ready for offline use")
    }
  })
  
