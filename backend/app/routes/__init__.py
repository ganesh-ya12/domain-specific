from .user import user_bp,google_bp
from .vector import vector_bp
from .rag import rag_bp

def register_blueprints(app):
    app.register_blueprint(user_bp,url_prefix='/user')
    app.register_blueprint(google_bp)
   # app.register_buleprint(vector_bp,url_prefix='/vector')
    app.register_blueprint(vector_bp, url_prefix='/vector')
    app.register_blueprint(rag_bp,url_prefix='/rag')
   # app.register_buleprint(files_bp,url_prefix='/file')
    