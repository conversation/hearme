class AddArticles < ActiveRecord::Migration
  def change
    create_table :articles  do |t|
      t.string :url, null: false
      t.references :website, null: false, index: true
    end
  end
end
