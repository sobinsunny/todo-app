class User < ActiveRecord::Base

  validates_confirmation_of :password
  validates_presence_of :password_confirmation
  has_many :tasks
end
