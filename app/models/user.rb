class User < ActiveRecord::Base
  require 'aescrypt'
  require 'bcrypt'


  validates_confirmation_of :password
  validates_presence_of :password_confirmation, :if => :password_changed?
  has_many :tasks
  before_save :encrypt_password

  def encrypt_password
    if self.password_confirmation.present?
      puts "....................."
      self.password = BCrypt::Password.create(self.password)
    end
  end
end
