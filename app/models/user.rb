class User < ActiveRecord::Base
  require 'aescrypt'
  require 'bcrypt'

  validates_confirmation_of :password
  validates_presence_of :password_confirmation
  has_many :tasks
  before_save :encrypt_password

  def encrypt_password
    self.password = BCrypt::Password.create(self.password)
  end
end
