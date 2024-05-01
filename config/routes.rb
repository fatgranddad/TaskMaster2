Rails.application.routes.draw do
  resources :tasks, only: [:new, :create]
end
