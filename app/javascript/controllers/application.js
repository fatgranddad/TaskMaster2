// Stimulusをローカルインストールされたパッケージからインポート
import { Application } from "@hotwired/stimulus"
import GreetingController from "./greeting_controller";  // 相対パスが正しいか確認してください

const application = Application.start();

// 開発中のデバッグ情報を設定
application.debug = true;
window.Stimulus = application;

// GreetingControllerをアプリケーションに登録
application.register("greeting", GreetingController);

export { application };