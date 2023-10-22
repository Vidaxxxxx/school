from . import main
from flask_login import current_user
from .forms import AdvertisementForm, UserForm, MessageForm
from app.models import Advertisement, User, Job_application
from flask import render_template, session, redirect, url_for, flash, current_app, request
from flask_login import login_required
from .. import db
import os
from werkzeug.utils import secure_filename
import uuid as uuid


@main.route('/')
def index():
    return render_template('index.html')

@main.route('/index')
def indexhtml():
    return render_template('index.html')

# Add a post advertisement
@main.route('/add_advertisement', methods=['GET', 'POST'])
@login_required
def add_advertisement():

    form = AdvertisementForm()
    id=current_user.id_role
    if id == 2:

        if form.validate_on_submit():
            picture_name = None  
            if form.picture.data:
                file = form.picture.data
                filename = secure_filename(file.filename) # Secure the file
                # set UUID
                pic_name_uuid = str(uuid.uuid1()) + "_" + filename
                
                file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], pic_name_uuid)
                file.save(file_path)
                
                picture_name = pic_name_uuid  # Keep only file name
            
            advertisement = Advertisement(
                picture=picture_name, # Save only file name
                title=form.title.data,
                description=form.description.data,
                wages=form.wages.data,
                working_time=form.working_time.data,
                place=form.place.data,
                id_user=current_user.id
            )
 
            # add advertisement data to database
            db.session.add(advertisement)
            db.session.commit()

            # return a message
            flash("Advertisement submitted successfully!")
            
            # clear the form
            form = AdvertisementForm()

        # redirect to the webpage
        return render_template("add_advertisement.html", form=form)
    else:
        flash("Acces not authorized")
        return redirect(url_for('main.index'))



# update advertisement
@main.route('/advertisement/edit/<int:id>', methods=['GET', 'POST'])
@login_required
def edit_advertisement(id):
    if current_user.id_role == 2:

        post = Advertisement.query.get_or_404(id)
        form = AdvertisementForm()
        picture_name = None 

        if form.picture.data:
                file = form.picture.data
                filename = secure_filename(file.filename) # Secure the file
                # set UUID
                pic_name_uuid = str(uuid.uuid1()) + "_" + filename
                
                file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], pic_name_uuid)
                file.save(file_path)
                
                picture_name = pic_name_uuid  # Keep only file name and uuid

        if form.validate_on_submit():
            post.title = form.title.data
            post.picture = picture_name
            post.description = form.description.data
            post.wages = form.wages.data
            post.working_time = form.working_time.data
            post.place = form.place.data  

            # update DB
            db.session.add(post)
            db.session.commit()
            flash("Advertisement has been updated!")
            return redirect(url_for('main.advertisement', id=post.id))
        
        form.title.data = post.title  
        form.picture.data = post.picture
        form.description.data = post.description
        form.wages.data = post.wages
        form.working_time.data = post.working_time
        form.place.data = post.place 
        return render_template('edit_advertisement.html', form=form)   
    else:
        flash("Acces not authorized")
        return redirect(url_for('main.index'))

            

# Delete Advertisement
@main.route('/advertisement/delete/<int:id>')
@login_required
def delete_post(id):
    if current_user.id_role == 2: 
        advertisement_to_delete = Advertisement.query.get_or_404(id)

        try:
            db.session.delete(advertisement_to_delete)
            db.session.commit()
            flash("Advertisement was deleted!")
            return redirect(url_for('main.my_advertisement'))
        except:
            flash("There was a problem deleting the post, try again...")
    else:
        flash("Access not authorized")
    return redirect(url_for('main.index'))


# Advertisement Page
@main.route('/advertisement')
def advertisement():
    # Grab all the posts from the DB
    advertisements = Advertisement.query.order_by(Advertisement.date_posted)
    return render_template("advertisement.html", posts=advertisements)

# My Advertisement
@main.route('/my_advertisement')
@login_required
def my_advertisement():
    user_id = current_user.id
    advertisements = Advertisement.query.filter_by(id_user=user_id).order_by(Advertisement.date_posted).all()
    return render_template("my_advertisement.html", posts=advertisements)


# Apply
@main.route('/advertisement/apply/<int:id>', methods=['GET', 'POST'])
def apply(id):
    # Check if the user is authenticated
    if current_user.is_authenticated:
        id_role = current_user.id_role
        if id_role == 2:
            flash("Acces not authorized")
            return redirect(url_for('main.index'))
    else:
        id_role = None  # default

    
    form = MessageForm() if current_user.is_authenticated else UserForm()

    if form.validate_on_submit():
        cv_name = None  
        if form.cv.data:
            file = form.cv.data
            filename = secure_filename(file.filename)  # Secure the file
            # set UUID
            cv_name_uuid = str(uuid.uuid1()) + "_" + filename
            file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], cv_name_uuid)
            file.save(file_path)
            cv_name = cv_name_uuid  # Keep only file name

        # anonymous users
        if not current_user.is_authenticated:
            user = User(
                lastname=form.lastname.data, 
                firstname=form.firstname.data, 
                email=form.email.data, 
                phone=form.phone.data, 
                cv=cv_name
            )
            db.session.add(user)
            db.session.flush()  # Get the id of the newly created user before committing
        else:
            user = current_user

        application = Job_application(
            message=form.message.data,
            id_user=user.id,  # Link application to the user
            id_advertisement=id  # Link application to the advertisement
        )
        
        db.session.add(application)
        db.session.commit()

        flash('Apply success!', 'success') 
        return redirect(url_for('main.advertisement'))
    
    # Clear
    if current_user.is_authenticated:
        form = MessageForm()  
    else: 
        form = UserForm()

    return render_template('apply.html', form=form)


# Candidate
@main.route('/advertisement/candidate/<int:id>')
@login_required
def candidate(id):
    advertisement = Advertisement.query.get_or_404(id)
    if current_user.id_role == 2 and current_user.id == advertisement.id_user:
        post = Job_application.query.filter_by(id_advertisement=id).all()
        return render_template("candidate.html", posts=post, id=id)
    else:
        flash("Access not authorized")
        return redirect(url_for('main.index'))

# from flask import send_from_directory

# Download CV
# @main.route('/download_cv/<filename>')
# @login_required
# def download_cv(filename):
#     if current_user.id_role == 2:
#         return send_from_directory(current_app.config['UPLOAD_FOLDER'], filename, as_attachment=True)
#     else:
#         flash("Access not authorized")
#         return redirect(url_for('main.index'))




    





