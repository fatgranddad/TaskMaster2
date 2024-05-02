// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
// @hotwired/stimulus をインポートしてアプリケーションを初期化します
import { Application } from "../../node_modules/@hotwired/stimulus/dist/stimulus.umd.js";
import HelloController from "./controllers/hello_controller";

const application = Application.start();

// HelloController をアプリケーションに登録します
application.register("hello", HelloController);

// ドキュメントが完全に読み込まれた後に実行されるイベントリスナーを設定
document.addEventListener('turbo:load', () => {
  // タスクフォームを取得し、イベントリスナーを追加
  const addTaskForm = document.getElementById('add-task-form');
  if (addTaskForm) {
    addTaskForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const taskName = document.getElementById('task-name').value;
      console.log(`タスクを追加: ${taskName}`);
      addTaskForm.reset();
    });
  }

  // すべての完了チェックボックスにイベントリスナーを追加
  document.querySelectorAll('.task-complete-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const taskId = this.dataset.taskId;
      const taskRow = document.querySelector(`tr[data-task-id="${taskId}"]`); // タスク行を特定

      console.log('タスクのチェックが変更されました:', taskId);
      console.log(`タスク ${taskId} は ${this.checked ? '完了' : '未完了'} です。`);

      fetch(`/tasks/${taskId}/toggle_completion`, {
        method: 'PUT',
        headers: {
          'X-CSRF-Token': document.querySelector("[name='csrf-token']").getAttribute('content'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: this.checked })
      })
      .then(response => {
        if (response.ok) {
          console.log('完了トグルのレスポンスが成功しました');
          if (this.checked) {
            taskRow.classList.add('completed');
            console.log(`タスク ${taskId} に 'completed' クラスが追加されました。`);
          } else {
            taskRow.classList.remove('completed');
            console.log(`タスク ${taskId} から 'completed' クラスが削除されました。`);
          }
        }
        return response.json();
      })
      .then(data => {
        console.log('タスクの完了状態がトグルされました:', data);
      })
      .catch(error => {
        console.error('タスクの完了状態のトグルでエラーが発生しました:', error);
      });
    });
  });

  // すべての削除ボタンにイベントリスナーを追加
  document.querySelectorAll('.delete-task-button').forEach(button => {
    button.addEventListener('click', function() {
      const taskId = this.dataset.taskId;
      console.log(`タスク ${taskId} を削除します`);
      // ここにタスク削除の追加処理が必要な場合は記述
    });
  });
});