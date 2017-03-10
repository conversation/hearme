# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170310004028) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "uuid-ossp"

  create_table "actions", force: :cascade do |t|
    t.string  "action_type", null: false
    t.integer "paragraph",   null: false
    t.integer "article_id",  null: false
  end

  add_index "actions", ["article_id"], name: "index_actions_on_article_id", using: :btree

  create_table "articles", force: :cascade do |t|
    t.string  "url",        null: false
    t.integer "website_id", null: false
    t.text    "body"
    t.string  "title"
  end

  add_index "articles", ["website_id"], name: "index_articles_on_website_id", using: :btree

  create_table "websites", force: :cascade do |t|
    t.string "name",              null: false
    t.string "url",               null: false
    t.string "background_colour"
    t.string "foreground_colour"
  end

end
