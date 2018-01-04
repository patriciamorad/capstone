Rails.application.routes.draw do
  post 'user_token' => 'user_token#create'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :v1 do 
    post "/users" => "users#create"
    post "/favorite_events" => "attended_events#create"
    get "/events" => "events#index"
  end
end
