require("@hotwired/turbo-rails");
var $7Tu7o$hotwiredstimulus = require("@hotwired/stimulus");
var $7Tu7o$hotwiredstimuluswebpackhelpers = require("@hotwired/stimulus-webpack-helpers");

// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails



const $3b724a02d232d001$var$application = (0, $7Tu7o$hotwiredstimulus.Application).start();
const $3b724a02d232d001$var$context = undefined("./controllers", true, /\.js$/);
$3b724a02d232d001$var$application.load((0, $7Tu7o$hotwiredstimuluswebpackhelpers.definitionsFromContext)($3b724a02d232d001$var$context));
document.addEventListener("turbo:load", ()=>{
    const addTaskForm = document.getElementById("add-task-form");
    if (addTaskForm) addTaskForm.addEventListener("submit", function(event) {
        event.preventDefault();
        // ここにタスクを追加するためのAPI呼び出しまたはローカルの処理を記述
        const taskName = document.getElementById("task-name").value;
        console.log(`Adding task: ${taskName}`);
        // フォームをリセット
        addTaskForm.reset();
    });
    // タスク完了トグル
    document.querySelectorAll(".task-complete-checkbox").forEach((checkbox)=>{
        checkbox.addEventListener("change", function() {
            const taskId = this.dataset.taskId;
            console.log(`Task ${taskId} completed status: ${this.checked}`);
        // ここにタスクの完了状態を更新するAPI呼び出しを記述
        });
    });
    // タスク削除機能
    document.querySelectorAll(".delete-task-button").forEach((button)=>{
        button.addEventListener("click", function() {
            const taskId = this.dataset.taskId;
            console.log(`Deleting task ${taskId}`);
        // ここにタスクを削除するAPI呼び出しを記述
        });
    });
});


//# sourceMappingURL=index.js.map
