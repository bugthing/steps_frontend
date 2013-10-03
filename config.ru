require 'rack/contrib/try_static'

require "#{File.dirname(__FILE__)}/lib/active_mong"

# hack to avoid 405 errors when posting, etc..
Rack::File::ALLOWED_VERBS = %w[GET HEAD POST PUT OPTIONS]

use Rack::TryStatic,
    :root => File.expand_path(File.dirname(__FILE__)),
    :urls => %w[/],
    :try => ['.html', 'index.html', '/index.html']

#use Rack::Parser, :parsers => { 'application/json' => proc { |data| JSON.parse data } }

run ActiveMong.new()
