DROP TABLE IF EXISTS CHOICE;
DROP TABLE IF EXISTS ANSWER;
DROP TABLE IF EXISTS QUESTION;
DROP TABLE IF EXISTS ADMISSION;
DROP TABLE IF EXISTS RESEARCHERLOGIN;
DROP TABLE IF EXISTS RESEARCHER;
DROP TABLE IF EXISTS FALL;
DROP TABLE IF EXISTS DIARYENTRY;
DROP TABLE IF EXISTS PATIENTLOGIN;
DROP TABLE IF EXISTS PATIENT;

CREATE TABLE PATIENT (
patientID INTEGER NOT NULL AUTO_INCREMENT,
patient_nhsRef DECIMAL(10) UNIQUE NOT NULL,
patient_username VARCHAR(25) NOT NULL,
patient_password VARCHAR(25) NOT NULL,
patient_fName VARCHAR(25) NOT NULL,
patient_lName VARCHAR(25) NOT NULL,
patient_dob DATETIME NOT NULL,
patient_addressI VARCHAR(45) NOT NULL,
patient_addressII VARCHAR(45),
patient_postcode VARCHAR(7) NOT NULL,
patient_tel VARCHAR(11),
patient_mobile VARCHAR(13),
patient_email VARCHAR(1000) CHARACTER SET utf8 ,
patient_comment VARCHAR(1000) CHARACTER SET utf8 ,
fcmToken VARCHAR(1000) CHARACTER SET utf8 ,
fcmToken_creation DATETIME NOT NULL,
PRIMARY KEY (patientID)
);

CREATE TABLE PATIENTLOGIN (
sessionID INTEGER NOT NULL AUTO_INCREMENT,
patientID INTEGER NOT NULL,
login_date DATETIME NOT NULL,
login_status BOOLEAN,
login_token VARCHAR(128),
PRIMARY KEY (sessionID),
FOREIGN KEY (patientID) REFERENCES PATIENT(patientID) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE DIARYENTRY (
entryID INTEGER NOT NULL AUTO_INCREMENT,
patientID INTEGER NOT NULL,
entry_date DATETIME NOT NULL,
entry VARCHAR(1000) CHARACTER SET utf8 ,
PRIMARY KEY (entryID),
FOREIGN KEY (patientID) REFERENCES PATIENT(patientID) ON UPDATE CASCADE ON DELETE CASCADE 
);

CREATE TABLE FALL (
fallID INTEGER NOT NULL AUTO_INCREMENT,
patientID INTEGER NOT NULL,
fall_date DATETIME NOT NULL,
PRIMARY KEY (fallID),
FOREIGN KEY (patientID) REFERENCES PATIENT(patientID) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE RESEARCHER (
researcherID INTEGER NOT NULL AUTO_INCREMENT,
researcher_nhsRef DECIMAL(10) UNIQUE NOT NULL,
researcher_username VARCHAR(25) NOT NULL,
researcher_password VARCHAR(25) NOT NULL, 
researcher_fName VARCHAR(25) NOT NULL,
researcher_lName VARCHAR(25) NOT NULL,
researcher_tel VARCHAR(11),
researcher_mobile VARCHAR(13),
researcher_email VARCHAR(1000) CHARACTER SET utf8 ,
PRIMARY KEY (researcherID)
);

CREATE TABLE RESEARCHERLOGIN (
sessionID INTEGER NOT NULL AUTO_INCREMENT,
researcherID INTEGER NOT NULL,
login_date DATETIME NOT NULL,
login_status BOOLEAN,
login_token VARCHAR(128),
PRIMARY KEY (sessionID),
FOREIGN KEY (researcherID) REFERENCES RESEARCHER(researcherID) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE ADMISSION (
admissionID INTEGER NOT NULL AUTO_INCREMENT,
patientID INTEGER NOT NULL,
researcherID INTEGER,
admission_date DATETIME NOT NULL, 
PRIMARY KEY (admissionID),
CONSTRAINT fk1 FOREIGN KEY (patientID) REFERENCES PATIENT(patientID) ON UPDATE CASCADE ON DELETE CASCADE, 
CONSTRAINT fk2 FOREIGN KEY (researcherID) REFERENCES RESEARCHER(researcherID) ON UPDATE CASCADE ON DELETE SET NULL
);

CREATE TABLE QUESTION (
questionID INTEGER NOT NULL AUTO_INCREMENT,
question VARCHAR(1000) CHARACTER SET utf8 NOT NULL,
question_charLim INTEGER,
question_type VARCHAR(25) NOT NULL,
PRIMARY KEY (questionID)
);

CREATE TABLE ANSWER (
answerID INTEGER NOT NULL AUTO_INCREMENT,
questionID INTEGER NOT NULL,
patientID INTEGER NOT NULL,
answer VARCHAR(1000) CHARACTER SET utf8 NOT NULL,
PRIMARY KEY (answerID),
CONSTRAINT fk3 FOREIGN KEY (questionID) REFERENCES QUESTION(questionID) ON UPDATE CASCADE ON DELETE CASCADE, 
CONSTRAINT fk4 FOREIGN KEY (patientID) REFERENCES PATIENT(patientID) ON UPDATE CASCADE ON DELETE CASCADE 
);

CREATE TABLE CHOICE (
choiceID INTEGER NOT NULL AUTO_INCREMENT,
questionID INTEGER NOT NULL,
choice VARCHAR(25) NOT NULL,
PRIMARY KEY (choiceID),
FOREIGN KEY (questionID) REFERENCES QUESTION(questionID) ON UPDATE CASCADE ON DELETE CASCADE
);


INSERT INTO PATIENT (patient_nhsRef, patient_username, patient_password, patient_fName, patient_lName, patient_dob, 
patient_addressI, patient_addressII, patient_postcode, patient_tel, patient_mobile, patient_email, patient_comment, 
fcmToken, fcmToken_creation) VALUES (1111111111, 'maureenW38', 'Iamthedefault', 'Maureen', 'Ward', '1999/05/05 06:00:00', 
'80 North Road East', 'Basement Flat', 'PL3XQC', '01752123999', '+447849198656', 'shroudedLR754battery@gmail.com', 
'This one is a keeper, she is doing well.', 'cA0p7foP6Rw:APA91bEe4AHewzKxy9Fy2v5UIZ-twKkIU2A_8WOxQjsZMCHCS9roUATLaOs3_E5KcvB3TQDTZvymM-gBkY0KG3-ffTZh45J0vtRfAnPJ6wis4u7rePAUkeMwPZW1DwqLhuqC96y6Mqp',
NOW());
                                     
INSERT INTO PATIENT (patient_nhsRef, patient_username, patient_password, patient_fName, patient_lName, patient_dob, 
patient_addressI, patient_addressII, patient_postcode, patient_tel, patient_mobile, patient_email, patient_comment, 
fcmToken, fcmToken_creation) VALUES (1111111112, 'gillianM69', 'Iamthesecond', 'Gillian', 'Marks', '2000/12/31 12:54:23', 
'82 North Road East', '1st Floor Flat', 'PL3XQZ', '01752123111', '+447123456789', 'wobblingcandycane@outlook.com', 
'Wants to trial new medication.', 'cA0p7foP6Rw:ADO9noTe4BOtherxy9TryinGIZ-toKfINDA_8EAsTerZEGGSS9becAUSeOs3_E5TheR3TAREZnonE-gBkY0KG3-ffTZh45J0vtRfAnPJ6wis4u7rePAUkeMwPZW1DwqLhuqTOLd6You',
NOW());
                                     
INSERT INTO RESEARCHER (researcher_nhsRef, researcher_username, researcher_password, researcher_fName, researcher_lName,
researcher_tel, researcher_mobile, researcher_email) VALUES (9999999999, 'drrespectable', 'defaultdoctorayyy', 'Roland', 
'Respectable', '01752766644', '07723619882', 'iamtheonedontweighatondontneedaguntogetrespectuponthestreet@yahoo.com');
