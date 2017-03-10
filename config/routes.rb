Rails.application.routes.draw do
  resources :websites do
    collection do
      post :find
    end

    resources :articles do
      member do
        post :action
      end
    end
  end

  get '/check.txt', to: proc {[200, {}, ['it_works']]}
  root 'pages#home'
end
