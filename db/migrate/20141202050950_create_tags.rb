class CreateTags < ActiveRecord::Migration
    def self.up
      create_table :tags do |t|
          t.references :user
          t.references :task
          t.integer :task_order,:auto_increment => true
          t.timestamps
      end
    end
    def self.down
      drop_table :tags
    end
end
