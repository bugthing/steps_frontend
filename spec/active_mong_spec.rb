require 'rack'
require 'ostruct'
require_relative '../lib/active_mong'

require 'rack/test'
RSpec.configure do |config|
  config.include Rack::Test::Methods
end

describe ActiveMong do

  def app
    #ActiveMong.new()
    ActiveMong.new(fake_mongo)
  end

  subject { JSON.parse(last_response.body) }

  describe 'get' do
    before { get path  }
    context "GET /" do
      let(:path) { '/' }
      it { should have_key("databases") }
    end

    context "GET /steps" do
      let(:path) { '/steps' }
      it { should have_key("collections") }
    end

    context "GET /steps/charts" do
      let(:path) { '/steps/charts' }
      it { should have_key("charts") }
    end

    context "GET /steps/charts/ID" do
      let(:path) { '/steps/charts/524c6f2d858e7b4de6f38ad9' }
      it { should have_key("chart") }
      its(["chart"]) { should have_key("id") }
      its(["chart"]) { should_not have_key("_id") }
    end

  end

  describe 'post' do
    before { post path, args_hash.to_json, "CONTENT_TYPE" => "application/json" }
    context "POST /steps/charts" do
      let(:path) { '/steps/charts' }
      let(:args_hash) do
        {"chart" => {"title" => "Test Title"}}
      end
      it { should have_key("chart") }
      its(["chart"]) { should_not have_key("_id") }
      its(["chart"]) { should include( "title" => "Test Title" ) }
    end
  end

  context "with an existing document" do

    # TODO: need fixtures for mongo .. but this will do for now..
    let(:fake_mdoc) { { "_id" => BSON::ObjectId("524c6f2d858e7b4de6f38ad9"), "title" => "Test Title2"} }
    before :each do
      post '/steps/charts', {"chart" => {"title" => "Existing Chart"}}.to_json, "CONTENT_TYPE" => "application/json"
      @existing_doc = JSON.parse(last_response.body) 
    end

    describe 'update' do
      before { put path, args_hash.to_json, "CONTENT_TYPE" => "application/json" }
      let(:id) { @existing_doc['chart']['id'] }
      context "PUT /steps/charts/ID" do
        let(:path) { '/steps/charts/' + id }
        let(:args_hash) do
          {"chart" => {"title" => "Test Title2"}}
        end
        it { should have_key("chart") }
        its(["chart"]) { should_not have_key("_id") }
        its(["chart"]) { should include( "title" => "Test Title2" ) }
        its(["chart"]) { should include( "id" => id ) }
      end
    end

    describe 'delete' do
      before { delete path, args_hash.to_json, "CONTENT_TYPE" => "application/json" }
      let(:id) { @existing_doc['chart']['id'] }
      context "DELETE /steps/charts/ID" do
        let(:path) { '/steps/charts/' + id }
        let(:args_hash) do
          { }
        end
        it { should be_an Hash }
      end
    end
  end

  # define a mock mongo interface..

  let(:fake_mongo) { double db: fake_mdb, database_names: fake_database_list }
  let(:fake_mdb) { double collection: fake_mcoll, collection_names: fake_collection_list }
  let(:fake_mdoc_cursor) { double to_a: [ fake_mdoc ] }
  let(:fake_mcoll) { double name: 'charts', find_one: fake_mdoc, find: fake_mdoc_cursor, insert: fake_mdoc_inserted, update: fake_mdoc_updated, remove: fake_mdoc_removed }

  let(:fake_database_list) { %w|steps db2| }
  let(:fake_collection_list) { %w|charts nodes actions| }
  let(:fake_mdoc) { { "_id" => BSON::ObjectId("524c6f2d858e7b4de6f38ad9"), "title" => "Test Title"} }
  let(:fake_mdoc_inserted) { "524c6f2d858e7b4de6f38bd9" }
  let(:fake_mdoc_updated) { {"updatedExisting"=>true, "n"=>1, "connectionId"=>731, "err"=>nil, "ok"=>1.0} }
  let(:fake_mdoc_removed) { {"n"=>1, "connectionId"=>709, "err"=>nil, "ok"=>1.0} }

end
