from app import db


class Location(db.Model):
    location_id = db.Column("location_id", db.INT, primary_key=True, nullable=False, autoincrement=True)
    description = db.Column("description", db.VARCHAR(length=280), nullable=False, unique=True)
    thumbnail = db.Column("thumbnail", db.VARCHAR(length=128), nullable=True)
    created_by = db.Column("created_by", db.INT, db.FOREIGNKEY("user.user_id"), nullable=False)
