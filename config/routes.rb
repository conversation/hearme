Rails.application.routes.draw do
  resources :sites do
    resources :articles
  end

  get '/check.txt', to: proc {[200, {}, ['it_works']]}
  root 'pages#home'
end
