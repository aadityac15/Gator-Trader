from app import db

class Listing(db.Model):
    listing_id = db.Column(db.INT, primary_key=True, nullable=False, autoincrement=True)
    type = db.Column(db.VARCHAR(length=45), nullable=False)
    description = db.Column(db.VARCHAR(length=45), nullable=True)
    type = db.Column(db.VARCHAR(length=45), nullable=True)
    price = db.Column(db.DECIMAL, default=0.0, nullable=False)
    thumbnail = db.Column(db.VARCHAR(length=45), nullable=True)
    created_on = db.Column(db.DATETIME, nullable=False)
    last_edited_on = db.Column(db.DATETIME, nullable=False)
    created_by = db.Column(db.VARCHAR(length=45), nullable=True)
