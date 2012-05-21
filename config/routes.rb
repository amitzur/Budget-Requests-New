Ksafim::Application.routes.draw do

  devise_for :users, :controllers => { :omniauth_callbacks => "omniauth_callbacks" }

  resources :bakashas

  match '/open-budget/:id' => 'application#get_budget'

  match '/scans' => 'scans#index'

  match '/start' => 'application#start'
  match '/what-is-crowdsourcing' => 'application#crowdsourcing'
  match '/about' => 'application#about'
  match '/help' => 'application#help'
  match '/contact' => 'application#contact'

  root :to => 'application#index'

end
