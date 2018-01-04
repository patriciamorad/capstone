require "unirest"
require "pp"

while true 
  puts "[signup] Signup (create a user)"
  puts "[login] Login (create a JSON web token)"
  puts "[logout] Logout (create a JSON web token)"
  puts
  puts "[q] QUIT"

  user_input = gets.chomp
#Create User/Signup
  if user_input == "signup"
    params = {}
    print "Name: "
    params[:name] = gets.chomp
    print "Email: "
    params[:email] = gets.chomp
    print "Password: "
    params[:password] = gets.chomp
    print "Please confirm your password: "
    params[:password_confirmation] = gets.chomp
  response = Unirest.post("http://localhost:3000/v1/users", parameters: params)
  pp response.body 
  #Login 
  elsif user_input == "login"
    puts "Login to the app"
    params = {}
    print "Email: "
    params[:email] = gets.chomp 
    print "Password: "
    params[:password] = gets.chomp 
    response = Unirest.post("http://localhost:3000/user_token", 
      parameters: {auth: {email:  params[:email], password: params[:password]}} 
    )
    pp response.body

  # Save the JSON web token from the response
  jwt = response.body["jwt"]
  # Include the jwt in the headers of any future web requests
  Unirest.default_header("Authorization", "Bearer #{jwt}")
  #Logout
  elsif user_input == "logout"
    jwt = ""
    Unirest.clear_default_headers()
  elsif user_input == "q"
    puts "Goodbye!"
    break
  end 
  puts 
  puts "Press enter to continue"
  gets.chomp
end 




