Ksafim::Application.routes.draw do

  devise_for :users, :controllers => { :omniauth_callbacks => "omniauth_callbacks" }

  resources :bakashas

  match '/open-budget/:id' => 'application#get_budget'

  root :to => 'application#index'

end
