from . import admin
from app.models import User, Advertisement, Job_application
from flask import render_template
from flask_login import login_required

@admin.route('/dashboard_companies')
@login_required
def dashboard_companies():
    advertisements = Advertisement.query.all()
    companies = User.query.filter_by(id_role = 2)
    return render_template('admin/dashboard_companies.html', advertisements=advertisements, companies=companies)

@admin.route('/dashboard_candidates')
@login_required
def dashboard_candidates():
    candidates = User.query.filter_by(id_role = 1)
    job_applications = Job_application.query.all()
    return render_template('admin/dashboard_candidates.html', candidates=candidates, job_applications=job_applications)
