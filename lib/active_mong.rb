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

    (empty,db,coll,id) = env['PATH_INFO'].split('/')[1]

    @mdb   = connection.db(db)            if db
    @mcoll = @mdb.collection(coll)        if @mdb and coll
    @mdoc  = @mcoll.find_one("_id" => id) if @mcoll and id

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
    elsif mcoll
      # list all docs
    elsif mdb
      # list all collections
    else
      # list all databases
      dl = Returns::DatabaseList.new(connection.database_names)
      puts "FUCK: #{dl}"
      self.json = '[]'
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
      def initialize(db_names)
        #ActiveModel::ArraySerializer.new(db_names).as_json
      end
    end
    class Database
      include ActiveModel::SerializerSupport
    end
  end
end
