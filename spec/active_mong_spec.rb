require 'rack'
require 'ostruct'
require_relative '../lib/active_mong'

describe ActiveMong do

  describe '#call' do
    subject { 
      @response = active_mong.call(env) 
      #puts "DEBUG - JSON RESPONSE: #{@response[2][0]}"
      @json = JSON.parse(@response[2][0]) if @response[2]
    }

    let(:active_mong) { described_class.new(fake_mongo) }
    #let(:active_mong) { described_class.new() }
    let(:mongo_connection) { double }
    let(:env) { { 'PATH_INFO' => path, 'REQUEST_METHOD' => method } }

    context "GET /" do
      let(:path) { '/' }
      let(:method) { 'GET' }
      it { should have_key("databases") }
    end

    context "GET /steps" do
      let(:path) { '/steps' }
      let(:method) { 'GET' }
      it { should have_key("collections") }
    end

    context "GET /steps/charts" do
      let(:path) { '/steps/charts' }
      let(:method) { 'GET' }
      it { should have_key("charts") }
    end

    context "GET /steps/charts/ID" do
      let(:path) { '/steps/charts/524c6f2d858e7b4de6f38ad9' }
      let(:method) { 'GET' }
      it { should have_key("chart") }
      its(["chart"]) { should have_key("id") }
      its(["chart"]) { should_not have_key("_id") }
    end

    #context "POST /steps/charts" do
    #  let(:path) { '/steps/charts' }
    #  let(:method) { 'POST' }
    #  it { should have_key("chart") }
    #end
  end

  # define a mock mongo interface..

  let(:fake_mongo) { double db: fake_mdb, database_names: fake_database_list }
  let(:fake_mdb) { double collection: fake_mcoll, collection_names: fake_collection_list }
  let(:fake_mdoc_cursor) { double to_a: [ fake_mdoc ] }
  let(:fake_mcoll) { double name: 'charts', find_one: fake_mdoc, find: fake_mdoc_cursor }

  let(:fake_database_list) { %w|steps db2| }
  let(:fake_collection_list) { %w|charts nodes actions| }
  let(:fake_mdoc) { { "_id" => BSON::ObjectId("524c6f2d858e7b4de6f38ad9"), "title" => "chart one"} }


end
