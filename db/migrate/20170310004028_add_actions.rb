class AddActions < ActiveRecord::Migration
  def change
    create_table :actions  do |t|
      t.string :action_type, null: false
      t.integer :paragraph, null: false
      t.references :article, null: false, index: true
    end
  end
end
