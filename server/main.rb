require 'rubygems'
require 'bundler/setup'

require 'rethinkdb'
include RethinkDB::Shortcuts

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
