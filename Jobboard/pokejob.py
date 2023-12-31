import os
import click
from flask_migrate import Migrate
from app import create_app, db
from app.models import Advertisement, Company, Job_application, Role, User

app = create_app(os.getenv('FLASK_CONFIG') or 'default')
migrate = Migrate(app, db)

@app.shell_context_processor
def make_shell_context():
    return dict(db=db, Advertisement=Advertisement, Compagnies=Company, Job_applications=Job_application, Roles=Role, Users=User)

# For unit testing
@app.cli.command()
@click.argument('test_names', nargs=-1)
def test(test_names):
    """Run the unit tests."""
    import unittest
    if test_names:
        tests = unittest.TestLoader().loadTestsFromNames(test_names)
    else:
        tests = unittest.TestLoader().discover('tests')
    unittest.TextTestRunner(verbosity=2).run(tests)
