require 'json'
require 'ostruct'
require_relative '../lib/active_mong'

describe ActiveMong do

  describe '#call' do
    subject { 
      @response = active_mong.call(env) 
      @json = JSON.parse(@response[2][0]) if @response[2]
    }

    #let(:active_mong) { described_class.new() }
    let(:active_mong) { described_class.new(fake_mongo) }
    let(:mongo_connection) { double }
    let(:env) { { 'PATH_INFO' => path, 'REQUEST_METHOD' => method } }

    context "GET /" do
      let(:path) { '/' }
      let(:method) { 'GET' }
      specify do
        subject
        @json.length.should == 1
      end
    end
  end

end

def fake_mongo
  OpenStruct.new( 
    database_names: ["db1", "db2"]
  )
end
