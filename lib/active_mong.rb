require 'mongo'
require 'active_model_serializers'

class ActiveMong

  attr_reader :connection, :mdb, :mcoll, :mdoc
  attr_writer :response_code, :json
  def initialize(connection=nil)
    connection ||= Mongo::Connection.new("localhost", 27017)
    @connection = connection
  end

  def call(env)

    (empty,db,coll,id) = env['PATH_INFO'].split('/')

    #puts "HAVE: #{env} == #{db} -- #{coll} -- #{id}"
    
    @mdb   = connection.db(db) if db
    @mcoll = @mdb.collection(coll) if @mdb and coll
    @mdoc  = @mcoll.find_one("_id" => BSON::ObjectId(id)) if @mcoll and id

    # call method that is based on request method
    method_name = "handle_#{env['REQUEST_METHOD'].downcase}".to_sym
    public_send(method_name)

    # respond a'la rack
    [
      (@response_code || 200),
      {"Content-Type" => "application/json" },
      [ @json ]
    ]
  end

  def handle_get
    if mdoc
      # show doc
      #puts "DOC - SHOW - DOC: #{@mdoc}"
      self.json = @mdoc.to_json
    elsif mcoll
      # list all docs
      #puts "COLLECTION - LIST - DOCS: #{@mcoll.find}"
      self.json = @mcoll.find.to_json
    elsif mdb
      # list all collections
      colls = @mdb.collection_names
      self.json = colls.to_json
    else
      # list all databases
      dbs = connection.database_names
      #dl = Returns::DatabaseList.new(dbs)
      ##sz = dl.active_model_serializer.new(connection.database_names)
      #puts "FUCK: #{dl.to_json}"
      #puts "FUCK: #{connection.database_names.as_json}"
      self.json = dbs.to_json
    end
  end

  def handle_post
    if mdoc
      # NOTHING
      self.response_code = 406
    elsif mcoll
      # create a doc
    elsif mdb
      # create a collection
    else
      # create a database
    end
  end

  def handle_put
    if mdoc
      # update the doc
    elsif mcoll
      # NOTHING
      self.response_code = 406
    elsif mdb
      # NOTHING
      self.response_code = 406
    else
      # NOTHING
      self.response_code = 406
    end
  end

  def handle_delete
    if mdoc
      # delete the doc
    elsif mcoll
      # delete the collection
    elsif mdb
      # delete the database
    else
      # NOTHING
      self.response_code = 406
    end
  end

  class Returns
    class DatabaseList
      include ActiveModel::ArraySerializerSupport
      attr_accessor :attributes
      def initialize(attributes)
        @attributes = attributes
      end
      def each
        attributes.each
      end
    end
    class Database
      include ActiveModel::SerializerSupport
      attr_accessor :attributes
      def initialize(attributes)
        @attributes = attributes
      end
    end
  end
end
