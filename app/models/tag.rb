class Tag < ActiveRecord::Base
  belongs_to :shared_task,:foreign_key => 'task_id'
  belongs_to :user

end
