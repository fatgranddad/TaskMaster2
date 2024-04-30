import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["complete"];

  connect() {
    this.element.textContent = "Hello, TaskMaster2!";
  }

  toggleComplete(event) {
    event.preventDefault();
    const taskId = this.data.get("id"); // HTMLからdata-idを取得
    // ここにタスクの完了状態を更新するAPI呼び出しを記述するか、ローカルの状態を変更するロジックを記述
    console.log(`Toggling complete status for task ${taskId}`);
    this.completeTarget.classList.toggle("is-complete"); // CSSクラスをトグル
  }
}