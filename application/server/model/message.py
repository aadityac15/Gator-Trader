from app import db


class Message(db.Model):
    message_id = db.Column("message_id", db.INT, primary_key=True, nullable=False, autoincrement=True)
    sent_by = db.Column("sent_by", db.INT, db.FOREIGNKEY("user.user_id"), nullable=False)
    sent_to = db.Column("sent_to", db.INT, db.FOREIGNKEY("user.user_id"), nullable=False)
    message_body = db.Column("message_body", db.VARCHAR(length=280), nullable=False)
    sender_email = db.Column("sender_email", db.VARCHAR(length=50), nullable=True)
    sender_phone_number = db.Column("sender_phone_number", db.VARCHAR(length=11), nullable=True)
    type = db.Column("type", db.VARCHAR(15), nullable=False)
    timestamp = db.Column("timestamp", db.DATETIME, nullable=False)

    @property
    def serialize(self):
        return {
            "message_id": self.message_id,
            "sent_by": self.sent_by,
            "sent_to": self.sent_to,
            "message_body": self.message_body,
            "sender_email": self.sender_email,
            "sender_phone_number": self.sender_phone_number,
            "type": self.type,
            "timestamp": self.timestamp
        }
