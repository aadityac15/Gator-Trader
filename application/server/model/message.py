from app import db


class Message(db.Model):
    message_id = db.Column("message_id", db.INT, primary_key=True, nullable=False, autoincrement=True)
    sent_by = db.Column("sent_by", db.INT, db.FOREIGNKEY("user.user_id"), nullable=False)
    sent_to = db.Column("sent_to", db.INT, db.FOREIGNKEY("user.user_id"), nullable=False)
    message_body = db.Column("message_body", db.VARCHAR(length=280), nullable=False)
    timestamp = db.Column("timestamp", db.DATETIME, nullable=False)
