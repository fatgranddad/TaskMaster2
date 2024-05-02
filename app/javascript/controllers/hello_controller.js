// Stimulusコントローラーのインポート、ローカルパスを指定
import { Controller } from "../../node_modules/@hotwired/stimulus/dist/stimulus.min.js";

export default class extends Controller {
  static targets = ["complete"];

  // コントローラがページに接続されたときに実行
  connect() {
    this.element.textContent = "こんにちは、TaskMaster2!";
    console.log("HelloControllerが接続されました。");
  }

  // 完了状態のトグル機能
  toggleComplete(event) {
    event.preventDefault();
    const taskId = this.element.dataset.id; // data-id属性からタスクIDを取得
    console.log(`タスク ${taskId} の完了状態をトグルします。`);

    // タスクの完了状態をAPI経由でサーバーに通知
    fetch(`/tasks/${taskId}/toggle_completion`, {
      method: 'PUT',
      headers: {
        'X-CSRF-Token': document.querySelector("[name='csrf-token']").getAttribute('content'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed: this.completeTarget.classList.contains("is-complete") })
    })
    .then(response => {
      if (response.ok) {
        console.log(`タスク ${taskId} の完了状態が更新されました。`);
        this.completeTarget.classList.toggle("is-complete"); // CSSクラスをトグル
      } else {
        console.error(`タスク ${taskId} の更新に失敗しました。`);
      }
    })
    .catch(error => {
      console.error('API呼び出し中にエラーが発生しました:', error);
    });
  }
}
