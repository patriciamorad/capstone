Rails.application.routes.draw do
  post 'user_token' => 'user_token#create'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :v1 do 
    post "/users" => "users#create"
    get "/events" => "events#index"
    get "/events/:id" => "events#show"
    post "/event_tidbits" => "event_tidbits#create"
    get "/attended_events" => "attended_events#index"
    get "/attended_events/:id" => "attended_events#show"
    post "/attended_events" => "attended_events#create"

  end
end
