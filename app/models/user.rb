class User < ActiveRecord::Base
  require 'aescrypt'
  require 'bcrypt'

  validates_confirmation_of :password
  validates_presence_of :password_confirmation, :if => :password_changed?
  has_many :tasks , :dependent => :destroy
  has_many:comments , :dependent => :destroy
  before_save :encrypt_password
  has_many:tags
  has_many:shared_tasks, :class_name=>'Task',:through =>:tags

  def encrypt_password
    if self.password_confirmation.present?
      self.password = BCrypt::Password.create(self.password)
    end
  end
end
