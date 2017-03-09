class AddStylesToWebsites < ActiveRecord::Migration
  def change
    add_column :websites, :background_colour, :string
    add_column :websites, :foreground_colour, :string

  end
end
