class TasksController < ApplicationController
  def new
    @task = Task.new
  end

  def create
    @task = Task.new(task_params)
    if @task.save
      redirect_to tasks_path, notice: "タスクが追加されました。"
    else
      render :new
    end
  end

  def index
    @tasks = Task.all  # すべてのタスクを取得
  end

  def edit
    @task = Task.find(params[:id])
  end
  
  def update
    @task = Task.find(params[:id])
    if @task.update(task_params)
      redirect_to tasks_path, notice: 'タスクが更新されました。'
    else
      render :edit
    end
  end

  private

  def task_params
    params.require(:task).permit(:name, :details, :due_date)
  end
end
