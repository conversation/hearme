class AddWebsites < ActiveRecord::Migration
  def change
    create_table :websites, id: :uuid  do |t|
      t.string :name, null: false
      t.string :url, null: false
    end
  end
end
