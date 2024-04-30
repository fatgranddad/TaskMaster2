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
      // ここにタスクを追加するためのAPI呼び出しまたはローカルの処理を記述
      const taskName = document.getElementById('task-name').value;
      console.log(`Adding task: ${taskName}`);
      // フォームをリセット
      addTaskForm.reset();
    });
  }

  // タスク完了トグル
  document.querySelectorAll('.task-complete-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const taskId = this.dataset.taskId;
      console.log(`Task ${taskId} completed status: ${this.checked}`);
      // ここにタスクの完了状態を更新するAPI呼び出しを記述
    });
  });

  // タスク削除機能
  document.querySelectorAll('.delete-task-button').forEach(button => {
    button.addEventListener('click', function() {
      const taskId = this.dataset.taskId;
      console.log(`Deleting task ${taskId}`);
      // ここにタスクを削除するAPI呼び出しを記述
    });
  });
});
