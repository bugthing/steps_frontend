require 'rack/contrib/try_static'
require "#{File.dirname(__FILE__)}/lib/active_mong"
use Rack::TryStatic,
    :root => File.expand_path(File.dirname(__FILE__)),
    :urls => %w[/], :try => ['.html', 'index.html', '/index.html']
run ActiveMong.new()
