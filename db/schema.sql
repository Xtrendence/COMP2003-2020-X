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
	patient_password VARCHAR(76) NOT NULL,
	patient_fName VARCHAR(25) NOT NULL,
	patient_lName VARCHAR(25) NOT NULL,
	patient_dob DATETIME NOT NULL,
	patient_addressI VARCHAR(45) NOT NULL,
	patient_addressII VARCHAR(45),
	patient_postcode VARCHAR(7) NOT NULL,
	patient_tel VARCHAR(11),
	patient_mobile VARCHAR(13),
	patient_email VARCHAR(1000) CHARACTER SET utf8mb4 ,
	patient_comment VARCHAR(1000) CHARACTER SET utf8mb4 ,
	fcmToken VARCHAR(1000) CHARACTER SET utf8mb4 ,
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
	entry VARCHAR(1000) CHARACTER SET utf8mb4 ,
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
	researcher_password VARCHAR(76) NOT NULL, 
	researcher_fName VARCHAR(25) NOT NULL,
	researcher_lName VARCHAR(25) NOT NULL,
	researcher_tel VARCHAR(11),
	researcher_mobile VARCHAR(13),
	researcher_email VARCHAR(1000) CHARACTER SET utf8mb4 ,
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
	question VARCHAR(1000) CHARACTER SET utf8mb4 NOT NULL,
	question_charLim INTEGER,
	question_type VARCHAR(25) NOT NULL,
	PRIMARY KEY (questionID)
);

CREATE TABLE ANSWER (
	answerID INTEGER NOT NULL AUTO_INCREMENT,
	questionID INTEGER NOT NULL,
	patientID INTEGER NOT NULL,
	answer VARCHAR(1000) CHARACTER SET utf8mb4 NOT NULL,
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