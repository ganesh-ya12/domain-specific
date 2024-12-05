from .user import user_bp,google_bp

def register_blueprints(app):
    app.register_blueprint(user_bp,url_prefix='/user')
    app.register_blueprint(google_bp)
   # app.register_buleprint(files_bp,url_prefix='/file')
    