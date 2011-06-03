require "rubygems"
require 'bundler/setup'
Bundler.setup
require "rack/jekyll"

run Rack::Jekyll.new