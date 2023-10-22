from ..models import User, Company
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField
from wtforms.validators import DataRequired, Length, Email, Regexp, EqualTo
from wtforms import ValidationError


class LoginForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Length(1, 255), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    remember_me = BooleanField('Keep me logged in')
    submit = SubmitField('Log In')


# USERS
class RegistrationForm(FlaskForm):
    lastname = StringField('Lastname', validators=[DataRequired(), Length(1, 50)])
    firstname = StringField('Firstname', validators=[DataRequired(), Length(1, 50)])
    email = StringField('Email', validators=[DataRequired(), Length(1, 255), Email()])
    phone = StringField('Phone', validators=[Length(10, 20)])
    password = PasswordField('Password', validators=[DataRequired(), EqualTo('password2', message='Passwords must match.')])
    password2 = PasswordField('Confirm password', validators=[DataRequired()])
    submit = SubmitField('Register')

    def validate_email(self, field):
        if User.query.filter_by(email=field.data).first():
            raise ValidationError('Email already registered.')
    
    def validate_phone(self, field):
        if User.query.filter_by(phone=field.data).first():
            raise ValidationError('Phone already registered.')
    
    def validate_username(self, field):
        if User.query.filter_by(email=field.data).first():
            raise ValidationError('Username already in use.')

# COMPAGNIES
class Registration_companyForm(FlaskForm):
    name = StringField('Name Company', validators=[DataRequired(), Length(1, 50)])
    lastname = StringField('Lastname', validators=[DataRequired(), Length(1, 50)])
    firstname = StringField('Firstname', validators=[DataRequired(), Length(1, 50)])
    email = StringField('Email', validators=[DataRequired(), Length(1, 255), Email()])
    phone = StringField('Phone', validators=[Length(10, 20)])
    password = PasswordField('Password', validators=[DataRequired(), EqualTo('password2', message='Passwords must match.')])
    password2 = PasswordField('Confirm password', validators=[DataRequired()])
    submit = SubmitField('Register')

    def validate_name(self, field):
        if Company.query.filter_by(name=field.data).first():
            raise ValidationError('Company name already registered.')

    def validate_email(self, field):
        if User.query.filter_by(email=field.data).first():
            raise ValidationError('Email already registered.')
    
    def validate_phone(self, field):
        if User.query.filter_by(phone=field.data).first():
            raise ValidationError('Phone already registered.')
    
    def validate_username(self, field):
        if User.query.filter_by(email=field.data).first():
            raise ValidationError('Username already in use.')