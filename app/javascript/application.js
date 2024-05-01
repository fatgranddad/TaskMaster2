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
      fetch(`/tasks/${taskId}/toggle_completion`, {
        method: 'PUT',
        headers: {
          'X-CSRF-Token': document.querySelector("[name='csrf-token']").getAttribute('content'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: this.checked })
      })
      .then(response => response.json())
      .then(data => {
        console.log('Task completion toggled:', data);
      })
      .catch(error => {
        console.error('Error toggling task completion:', error);
      });
    });
  });

  // タスク削除機能
  document.querySelectorAll('.delete-task-button').forEach(button => {
    button.addEventListener('click', function() {
      const taskId = this.dataset.taskId;
      console.log(`Deleting task ${taskId}`);
    });
  });
});