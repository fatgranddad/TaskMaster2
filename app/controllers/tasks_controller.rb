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

  private

  def task_params
    params.require(:task).permit(:name, :details, :due_date)
  end
end
