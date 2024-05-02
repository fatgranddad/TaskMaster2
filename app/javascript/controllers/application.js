import { Application } from "@hotwired/stimulus"
import GreetingController from "./controllers/greeting_controller";  // 新しいコントローラをインポート

const application = Application.start()

// Configure Stimulus development experience
application.debug = true  // 開発中はデバッグ情報を有効にする
window.Stimulus = application

// 既存のコントローラー登録後に新しいコントローラを登録
application.register("greeting", GreetingController);  // 新しいコントローラを登録

export { application }