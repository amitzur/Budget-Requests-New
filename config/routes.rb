Ksafim::Application.routes.draw do

  devise_for :users, :controllers => { :omniauth_callbacks => "omniauth_callbacks" }

  resources :bakashas

  match '/open-budget/:id' => 'application#get_budget'

  match '/scans' => 'scans#index'

  match '/start' => 'application#start'

  root :to => 'application#index'

end
