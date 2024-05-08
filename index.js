var $7Tu7o$hotwiredstimulus = require("@hotwired/stimulus");

// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
// @hotwired/stimulus をインポートしてアプリケーションを初期化します

// Stimulusコントローラーのインポート、ローカルパスを指定

class $3f499cbaae3d2007$export$2e2bcd8739ae039 extends (0, $7Tu7o$hotwiredstimulus.Controller) {
    static targets = [
        "complete"
    ];
    // コントローラがページに接続されたときに実行
    connect() {
        this.element.textContent = "\u3053\u3093\u306B\u3061\u306F\u3001TaskMaster2!";
        console.log("HelloController\u304C\u63A5\u7D9A\u3055\u308C\u307E\u3057\u305F\u3002");
    }
    // 完了状態のトグル機能
    toggleComplete(event) {
        event.preventDefault();
        const taskId = this.element.dataset.id; // data-id属性からタスクIDを取得
        console.log(`\u{30BF}\u{30B9}\u{30AF} ${taskId} \u{306E}\u{5B8C}\u{4E86}\u{72B6}\u{614B}\u{3092}\u{30C8}\u{30B0}\u{30EB}\u{3057}\u{307E}\u{3059}\u{3002}`);
        // タスクの完了状態をAPI経由でサーバーに通知
        fetch(`/tasks/${taskId}/toggle_completion`, {
            method: "PUT",
            headers: {
                "X-CSRF-Token": document.querySelector("[name='csrf-token']").getAttribute("content"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                completed: this.completeTarget.classList.contains("is-complete")
            })
        }).then((response)=>{
            if (response.ok) {
                console.log(`\u{30BF}\u{30B9}\u{30AF} ${taskId} \u{306E}\u{5B8C}\u{4E86}\u{72B6}\u{614B}\u{304C}\u{66F4}\u{65B0}\u{3055}\u{308C}\u{307E}\u{3057}\u{305F}\u{3002}`);
                this.completeTarget.classList.toggle("is-complete"); // CSSクラスをトグル
            } else console.error(`\u{30BF}\u{30B9}\u{30AF} ${taskId} \u{306E}\u{66F4}\u{65B0}\u{306B}\u{5931}\u{6557}\u{3057}\u{307E}\u{3057}\u{305F}\u{3002}`);
        }).catch((error)=>{
            console.error("API\u547C\u3073\u51FA\u3057\u4E2D\u306B\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F:", error);
        });
    }
}


const $3b724a02d232d001$var$application = (0, $7Tu7o$hotwiredstimulus.Application).start();
// HelloController をアプリケーションに登録します
$3b724a02d232d001$var$application.register("hello", (0, $3f499cbaae3d2007$export$2e2bcd8739ae039));
// ドキュメントが完全に読み込まれた後に実行されるイベントリスナーを設定
document.addEventListener("turbo:load", ()=>{
    // タスクフォームを取得し、イベントリスナーを追加
    const addTaskForm = document.getElementById("add-task-form");
    if (addTaskForm) addTaskForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const taskName = document.getElementById("task-name").value;
        console.log(`\u{30BF}\u{30B9}\u{30AF}\u{3092}\u{8FFD}\u{52A0}: ${taskName}`);
        addTaskForm.reset();
    });
    // すべての完了チェックボックスにイベントリスナーを追加
    document.querySelectorAll(".task-complete-checkbox").forEach((checkbox)=>{
        checkbox.addEventListener("change", function() {
            const taskId = this.dataset.taskId;
            const taskRow = document.querySelector(`tr[data-task-id="${taskId}"]`); // タスク行を特定
            console.log("\u30BF\u30B9\u30AF\u306E\u30C1\u30A7\u30C3\u30AF\u304C\u5909\u66F4\u3055\u308C\u307E\u3057\u305F:", taskId);
            console.log(`\u{30BF}\u{30B9}\u{30AF} ${taskId} \u{306F} ${this.checked ? "\u5B8C\u4E86" : "\u672A\u5B8C\u4E86"} \u{3067}\u{3059}\u{3002}`);
            fetch(`/tasks/${taskId}/toggle_completion`, {
                method: "PUT",
                headers: {
                    "X-CSRF-Token": document.querySelector("[name='csrf-token']").getAttribute("content"),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    completed: this.checked
                })
            }).then((response)=>{
                if (response.ok) {
                    console.log("\u5B8C\u4E86\u30C8\u30B0\u30EB\u306E\u30EC\u30B9\u30DD\u30F3\u30B9\u304C\u6210\u529F\u3057\u307E\u3057\u305F");
                    if (this.checked) {
                        taskRow.classList.add("completed");
                        console.log(`\u{30BF}\u{30B9}\u{30AF} ${taskId} \u{306B} 'completed' \u{30AF}\u{30E9}\u{30B9}\u{304C}\u{8FFD}\u{52A0}\u{3055}\u{308C}\u{307E}\u{3057}\u{305F}\u{3002}`);
                    } else {
                        taskRow.classList.remove("completed");
                        console.log(`\u{30BF}\u{30B9}\u{30AF} ${taskId} \u{304B}\u{3089} 'completed' \u{30AF}\u{30E9}\u{30B9}\u{304C}\u{524A}\u{9664}\u{3055}\u{308C}\u{307E}\u{3057}\u{305F}\u{3002}`);
                    }
                }
                return response.json();
            }).then((data)=>{
                console.log("\u30BF\u30B9\u30AF\u306E\u5B8C\u4E86\u72B6\u614B\u304C\u30C8\u30B0\u30EB\u3055\u308C\u307E\u3057\u305F:", data);
            }).catch((error)=>{
                console.error("\u30BF\u30B9\u30AF\u306E\u5B8C\u4E86\u72B6\u614B\u306E\u30C8\u30B0\u30EB\u3067\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F:", error);
            });
        });
    });
    // すべての削除ボタンにイベントリスナーを追加
    document.querySelectorAll(".delete-task-button").forEach((button)=>{
        button.addEventListener("click", function() {
            const taskId = this.dataset.taskId;
            console.log(`\u{30BF}\u{30B9}\u{30AF} ${taskId} \u{3092}\u{524A}\u{9664}\u{3057}\u{307E}\u{3059}`);
        // ここにタスク削除の追加処理が必要な場合は記述
        });
    });
});


//# sourceMappingURL=index.js.map
