from . import auth
from .. import db
from ..models import User, Company
from .forms import LoginForm, RegistrationForm, Registration_companyForm
from flask import render_template, redirect, request, url_for, flash
from flask_login import current_user, login_user, logout_user, login_required

@auth.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user is not None and user.verify_password(form.password.data):
            login_user(user, form.remember_me.data)
            next = request.args.get('next')
            if next is None or not next.startswith('/'):
                next = url_for('main.index')
            return redirect(next)
        flash('Invalid email or password.')
    return render_template('auth/login.html', form=form)

@auth.route('/signup', methods=['GET', 'POST'])
def signup():
    form = RegistrationForm()
    if form.validate_on_submit():
        user = User(email=form.email.data,
                    password=form.password.data,
                    lastname=form.lastname.data,
                    firstname=form.firstname.data,
                    phone=form.phone.data,
                    id_role=1)
        db.session.add(user)
        db.session.commit()

        flash('You can now login.')
        return redirect(url_for('auth.login'))
    return render_template('auth/signup.html', form=form)

@auth.route('/signup_company', methods=['GET', 'POST'])
def signup_company():
    form = Registration_companyForm()
    if form.validate_on_submit():
        company = Company(name=form.name.data)
        db.session.add(company)
        db.session.flush()  # get id

        user = User(email=form.email.data,
                    password=form.password.data,
                    lastname=form.lastname.data,
                    firstname=form.firstname.data,
                    phone=form.phone.data,
                    id_role=2,
                    id_company=company.id)  # rely user and company
        db.session.add(user)
        db.session.commit()

        flash('You can now login.')
        return redirect(url_for('auth.login'))
    return render_template('auth/signup_company.html', form=form)

# Show profil
@auth.route('/profil')
@login_required
def profil():
    return render_template('/auth/profil.html')

@auth.route('/logout')
@login_required
def logout():
    logout_user()
    flash('You have been logged out.')
    return redirect(url_for('main.index'))