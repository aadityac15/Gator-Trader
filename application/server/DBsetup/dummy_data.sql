INSERT INTO user 
    VALUES 
        (1, 'T800', 'Sarah', 'Connor', 'sconner@fakemail.com', 'Password1', false, 'History'),  
        (2, 'Bulldozer', 'Carlos', 'Mendoza', 'cmendoza@fakemail.com', 'password2', false, 'Mathematics'),  
        (3, 'TheElderGod', 'Raiden', NULL, 'raiden@@fakemail.com', 'Password3', true, 'Physics'),  
        (4, 'Queenie', 'Kara',  'Strong', 'kstrong@fakemail.com', 'Password4', false, 'Kinesiology'),  
        (5, 'JDog', 'James',  'Daniels', 'jdaniels@fakemail.com', 'Password5', false, 'Civil Engineering');  
 
INSERT INTO listing  
    VALUES 
        (1, 'Room Cleaning', 'Will clean any room in your house.',  'service', 10, NULL, '2018-05-23 07:02:08', '2019-06-30 22:37:55', 5),
        (2, 'Math Textbook', 'Barely used math textbook for MAth 324.', 'book', 20, NULL, '2016-05-01 02:16:00', '2018-04-13 14:12:42', 2),  
        (3, 'Microwave', 'Brand new microwave for sale!',  'object', 59.99, NULL, '2017-05-14 21:56:42', '2019-10-25 18:56:02', 4),  
        (4, 'Couch', 'Used couch for sale.', 'furniture', 75, NULL, '2016-05-12 12:32:45', '2017-05-22 12:32:33', 1),
        (5, 'Physics Tutor', 'Will help with Physics homework and notes.',  'service', 25, NULL, '2017-09-04 14:22:16', '2018-11-04 04:44:15', 3);
        
INSERT INTO message
	VALUES
		(1, 2, 5, 'Dummy data is hard.', '2019-02-01 06:02:46'),
        (2, 5, 3, 'I don\'t know what to say.', '2018-02-01 06:02:46'),
        (3, 4, 1, 'Guize, halp.', '2017-02-01 06:02:46');
        
INSERT INTO location
	VALUES
		(1, 'YOUR place.', NULL, 5),
        (2, '555 Fake St.', NULL, 4),
        (3, 'The quad at SFSU.', NULL, 4),
        (4, 'The starbucks at Westlake.', NULL, 3),
        (5, 'Earthrealm.', NULL, 3),
        (6, 'Wherever the light touches.', NULL, 3),
        (7, 'Room 40B at the SFSU Library.', NULL, 2),
        (8, 'YOUR place.', NULL, 1);