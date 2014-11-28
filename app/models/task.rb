class Task < ActiveRecord::Base
  belongs_to :user
  validates_length_of :task, :minimum => 1, :allow_blank => false
  self.per_page = 100
end
