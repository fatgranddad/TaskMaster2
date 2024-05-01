// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import { Application } from "@hotwired/stimulus"
import { definitionsFromContext } from "@hotwired/stimulus-webpack-helpers"

const application = Application.start()
const context = require.context("./controllers", true, /\.js$/)
application.load(definitionsFromContext(context))

document.addEventListener('turbo:load', () => {
  const addTaskForm = document.getElementById('add-task-form');
  if (addTaskForm) {
    addTaskForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const taskName = document.getElementById('task-name').value;
      console.log(`Adding task: ${taskName}`);
      addTaskForm.reset();
    });
  }

  // タスク完了トグル
  document.querySelectorAll('.task-complete-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const taskId = this.dataset.taskId;
      const taskRow = document.querySelector(`tr[data-task-id="${taskId}"]`); // タスクの行を特定

      console.log('Checkbox changed for task:', taskId); // チェック変更確認用ログ
      console.log(`Checkbox for task ${taskId} is now ${this.checked ? 'checked' : 'unchecked'}.`); // チェック状態ログ

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
          console.log('Toggle completion response OK'); // レスポンス成功確認用ログ
          if (this.checked) {
            taskRow.classList.add('completed'); // タスクが完了したときにクラスを追加
            console.log(`'completed' class added to task ${taskId}.`); // クラス追加確認用ログ
          } else {
            taskRow.classList.remove('completed'); // タスクが未完了に戻ったときにクラスを削除
            console.log(`'completed' class removed from task ${taskId}.`); // クラス削除確認用ログ
          }
        }
        return response.json();
      })
      .then(data => {
        console.log('Task completion toggled:', data); // 完了状態トグル後のログ
      })
      .catch(error => {
        console.error('Error toggling task completion:', error); // エラーログ
      });
    });
  });

  // タスク削除機能
  document.querySelectorAll('.delete-task-button').forEach(button => {
    button.addEventListener('click', function() {
      const taskId = this.dataset.taskId;
      console.log(`Deleting task ${taskId}`);
      // 追加の削除処理が必要な場合はここに記述
    });
  });
});