require 'rubygems'
require 'bundler/setup'

require 'rethinkdb'
require 'eventmachine'
require 'faye'
require 'faye/websocket'
require 'sinatra'

include RethinkDB::Shortcuts
Faye::WebSocket.load_adapter "thin"

class Faye::Server
  def scheme; end
end

EM.run do

  Conn = r.connect host: "localhost", port: 28015
  Conn.use "rethink_chat"

  # Create Database
  begin
    r.db_create("rethink_chat").run(Conn)
  rescue RethinkDB::RqlRuntimeError; end

  # Add Tables and Indexes
  begin
    r.db("rethink_chat").table_create("messages").run(Conn)
  rescue RethinkDB::RqlRuntimeError; end

  begin
    r.db("rethink_chat").table("messages").index_create("created").run(Conn)
  rescue RethinkDB::RqlRuntimeError; end

  # HTTP
  class MessageApp < Sinatra::Base
    # We presume you're running the app from the repo's top directory
    set :public_folder, 'client'
    configure do
      set :threaded, true
    end

    get "/" do; redirect "/index.html"; end

    get "/message" do
      r
        .table("messages")
        .order_by({ index: "created" })
        .coerce_to("array")
        .run(Conn)
        .to_json
    end

    post "/message" do
      r
        .table("messages")
        .insert({
          userName: params["userName"],
          message: params["message"],
        })
        .run(Conn)
   end

  end

  # Add Faye
  App = Faye::RackAdapter.new MessageApp, mount: "/faye"

  # Changefeed listener
  r.table("messages").changes.em_run(Conn) do |err, change|
    App.get_client.publish('/message/new', change["new_val"])
  end

  # Send all messages at the beginning
  App.get_client.subscribe "/message/add" do |m|
    r.table("messages").insert(m).run(Conn)
  end

  Rack::Server.start app: App, Port: 8000

end
