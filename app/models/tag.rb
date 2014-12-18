class Tag < ActiveRecord::Base
  belongs_to :shared_task,:foreign_key => 'task_id'
  belongs_to :user
  
  def self.user_specific_delete(user_id,task_id)
    Tag.find(:first,:conditions=>{:task_id=>task_id,:user_id=>user_id}).destroy
  end
end
