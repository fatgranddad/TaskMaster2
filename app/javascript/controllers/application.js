import { Application } from "@hotwired/stimulus"

const application = Application.start()

// Configure Stimulus development experience
application.debug = true  // 開発中はデバッグ情報を有効にする
window.Stimulus   = application

export { application }
