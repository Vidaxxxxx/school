from flask_wtf import FlaskForm
from ..models import User
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, Length, Email, ValidationError, Regexp, EqualTo
from wtforms.widgets import TextArea
from flask_wtf.file import FileField, FileAllowed
import phonenumbers



class NameForm(FlaskForm):
    name = StringField('What is your name?', validators=[DataRequired()])
    submit = SubmitField('Submit')

# Create advertising form
class AdvertisementForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired()])
    description = StringField("Description", validators=[DataRequired()], widget=TextArea())
    wages = StringField("Wages", validators=[DataRequired()])
    working_time = StringField("Working Time", validators=[DataRequired()])
    place = StringField("Place", validators=[DataRequired()])
    picture = FileField('Upload Image', validators=[FileAllowed(['jpg', 'jpeg', 'png', 'gif'], 'Images only!')])
    submit = SubmitField("Submit")

# Create apply form
class UserForm(FlaskForm):
    lastname = StringField('Lastname', validators=[DataRequired()])
    firstname = StringField('Firstname', validators=[DataRequired()])
    phone = StringField('Phone', validators=[DataRequired()]) 
    email = StringField('Email', validators=[DataRequired(), Length(1, 255), Email()])
    cv = FileField('Upload CV', validators=[FileAllowed(['pdf'], 'PDF only!')])
    message = StringField('Message', validators=[DataRequired()], widget=TextArea())
    submit = SubmitField('Post')
    # Validate phone
    # def validate_phone(self, phone):
    #     try:
    #         p = phonenumbers.parse(phone.data)
    #         if not phonenumbers.is_valid_number(p):
    #             raise ValueError()
    #     except (phonenumbers.phonenumberutil.NumberParseException, ValueError):
    #         raise ValidationError('Invalid phone number')
    def validate_email(self, field):
        if User.query.filter_by(email=field.data).first():
            raise ValidationError('Email already registered.')
    
    def validate_phone(self, field):
        if User.query.filter_by(phone=field.data).first():
            raise ValidationError('Phone already registered.')
    
    def validate_username(self, field):
        if User.query.filter_by(email=field.data).first():
            raise ValidationError('Username already in use.')

# Create apply form for logged users
class MessageForm(FlaskForm):
    message = StringField('Message', validators=[DataRequired()], widget=TextArea())
    cv = FileField('Upload CV', validators=[FileAllowed(['pdf'], 'PDF only!')])
    submit = SubmitField('Submit')

