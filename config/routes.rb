Rails.application.routes.draw do
  resources :tasks, only: [:new, :create, :index, :edit, :update, :destroy]
end
