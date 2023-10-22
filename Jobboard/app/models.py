from . import db, login_manager
from datetime import datetime
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from . import db
from datetime import datetime

class Advertisement(db.Model):
    __tablename__ = "advertisement"
    id = db.Column(db.Integer, primary_key=True)
    picture = db.Column(db.String(255))
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    wages = db.Column(db.Integer, nullable=False)
    working_time = db.Column(db.Integer, nullable=False)
    place = db.Column(db.String(100), nullable=False)
    date_posted = db.Column(db.DateTime, default=datetime.now)
    id_user = db.Column(db.Integer, db.ForeignKey("user.id"))
    
    job_applications = db.relationship('Job_application', backref='advertisement')

class Company(db.Model):
    __tablename__ = "company"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    user = db.relationship('User', backref='company')

class Job_application(db.Model):
    __tablename__ = "job_application"
    id = db.Column(db.Integer, primary_key=True)
    id_advertisement = db.Column(db.Integer, db.ForeignKey('advertisement.id'))
    id_user = db.Column(db.Integer, db.ForeignKey("user.id"))
    date_posted = db.Column(db.DateTime, default=datetime.now)
    message = db.Column(db.Text)

class Role(db.Model):
    __tablename__ = "role"
    id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.String(50), nullable=False, unique=True)
    users = db.relationship('User', backref='role')

class User(UserMixin, db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    id_role = db.Column(db.Integer, db.ForeignKey("role.id"))
    id_company = db.Column(db.Integer, db.ForeignKey("company.id"))
    email = db.Column(db.String(255), nullable=False, unique=True)
    password_hash = db.Column(db.String(128))
    lastname = db.Column(db.String(50), nullable=False)
    firstname = db.Column(db.String(50), nullable=False)
    phone = db.Column(db.String(20), unique=True)
    cv = db.Column(db.String(255))
    
    job_applications = db.relationship('Job_application', backref='user')
    advertisements = db.relationship('Advertisement', backref='user')
    

    # Cannot read the password property
    @property
    def password(self):
        raise AttributeError("password is not a readable attribute")
    
    # Hash then store in password_hash the password
    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    # Boolean
    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

# return the user element of the correspoonding user_id or None
@login_manager.user_loader # register the function with Flask-Login
def load_user(user_id):
    return User.query.get(int(user_id))
