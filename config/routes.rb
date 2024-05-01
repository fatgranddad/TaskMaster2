Rails.application.routes.draw do
  root 'tasks#index'
  resources :tasks do
    member do
      put :toggle_completion
    end
  end
end
