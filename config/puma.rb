# config/puma.rb
port ENV["PORT"]
environment ENV['RACK_ENV']
threads 8,32
workers 3
preload_app!
