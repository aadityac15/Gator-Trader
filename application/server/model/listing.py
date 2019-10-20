from app import db


class Listing(db.Model):
    listing_id = db.Column("listing_id", db.INT, primary_key=True, nullable=False, autoincrement=True)
    title = db.Column("title", db.VARCHAR(length=45), nullable=False)
    description = db.Column("description", db.VARCHAR(length=280), nullable=True)
    type = db.Column("type", db.VARCHAR(length=45), nullable=True)
    price = db.Column("price", db.DECIMAL, default=0.0, nullable=False)
    thumbnail = db.Column("thumbnail", db.VARCHAR(length=128), nullable=True)
    created_on = db.Column("created_on", db.INT, db.FOREIGNKEY("user.user_id"), nullable=False)
    last_edited_on = db.Column("last_edited_on", db.DATETIME, nullable=False)
    created_by = db.Column("created_by", db.INT, db.FOREIGNKEY("user.user_id"), nullable=False)
