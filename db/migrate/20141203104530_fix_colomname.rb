class FixColomname < ActiveRecord::Migration
    def self.up
      rename_column :tasks, :users_id, :user_id
    end
    def self.down

    end
  end