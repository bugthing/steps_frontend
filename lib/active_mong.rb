require 'mongo'
require 'json'

class ActiveMong

  attr_reader :connection, :mdb, :mcoll, :mdoc
  attr_writer :response_code, :json
  def initialize(connection=nil)
    connection ||= Mongo::Connection.new("localhost", 27017)
    @connection = connection
  end

  def call(env)

    # TODO - there is a better way...
    # parse any json body if we got some..
    req  = Rack::Request.new(env)
    body = req.body.read if req.body
    if body and body.length >= 2
      @json_body = JSON.parse(body)
    end

    (empty,db,coll,id) = env['PATH_INFO'].split('/')

    #puts "HAVE: #{env} == #{db} -- #{coll} -- #{id}"

    @mdb   = connection.db(db) if db
    @mcoll = @mdb.collection(coll) if @mdb and coll
    @mdoc  = @mcoll.find_one("_id" => BSON::ObjectId(id)) if @mcoll and id

    # call method that is based on request method
    method_name = "handle_#{env['REQUEST_METHOD'].downcase}".to_sym
    public_send(method_name)

    transform_id

    # respond a'la rack
    [
      (@response_code || 200),
      {"Content-Type" => "application/json" },
      [ JSON.pretty_generate(@json || {}) ]
    ]
  end

  def handle_get
    if mdoc
      # show doc
      set_json_for mdoc
    elsif mcoll
      # list all docs
      self.json = { mcoll.name => mcoll.find.to_a}
    elsif mdb
      colls = mdb.collection_names
      self.json = { collections: colls }
    else
      # list all databases
      self.json = { databases: connection.database_names}
    end
  end

  def handle_post
    if mdoc
      self.response_code = 406
    elsif mcoll
      # create a doc
      #@mcoll.insert( @json_body )
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
      self.response_code = 406
    elsif mdb
      self.response_code = 406
    else
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
      self.response_code = 406
    end
  end

  private

  # re-keys '_id' to' id' & converts its value to a string
  #  base on the fact @json conforms to '{ key => "Hash or Array" }'
  def transform_id
    objects = @json.values.first
    objects = [ objects ] unless objects.is_a?(Array)
    objects.map do |obj|
     obj["id"] = obj.delete("_id").to_s if obj["_id"]
     obj
    end
  rescue NoMethodError => e
  end

  def set_json_for( doc )
    plural = mcoll.name.chop # rubbish!
    self.json = { plural => doc }
  end

end
