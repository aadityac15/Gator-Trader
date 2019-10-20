from app import db


class User(db.Model):
    user_id = db.Column("user_id", db.INT, primary_key=True, nullable=False, autoincrement=True)
    username = db.Column("username", db.VARCHAR(length=45), nullable=False, unique=True)
    first_name = db.Column("first_name", db.VARCHAR(length=45), nullable=True)
    last_name = db.Column("last_name", db.VARCHAR(length=45), nullable=True)
    email = db.Column("email", db.VARCHAR(length=45), nullable=True)
    password = db.Column("password", db.VARCHAR(length=45), nullable=False)
    is_admin = db.Column("is_admin", db.BOOLEAN, nullable=False)
    major = db.Column("major",  db.VARCHAR(length=45), nullable=True)
