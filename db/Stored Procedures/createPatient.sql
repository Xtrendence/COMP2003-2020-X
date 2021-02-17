CREATE DEFINER=`COMP2003_X`@`%` PROCEDURE `createPatient`(
	IN researcherID INTEGER,
    IN pNhsRef DECIMAL(10),
    IN pUsername VARCHAR(25),
    IN pPassword VARCHAR(76),
    IN pFirstName VARCHAR(25),
    IN pLastName VARCHAR(25),
    IN pTel VARCHAR(11),
    IN pMobile VARCHAR(13),
    IN pEmail VARCHAR(1000),
    IN pComment VARCHAR(1000),
    IN fcmToken VARCHAR(1000),
    IN fcmToken_creation DATETIME
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
        SELECT 'SQLException has occurred. Please try again.';
	END;
    
	INSERT INTO PATIENT (patient_nhsRef, patient_username, patient_password, patient_fName, 
    patient_lName, patient_tel, patient_mobile, patient_email, patient_comment, fcmToken, 
    fcmToken_creation) VALUES (pNhsRef, pUsername, pPassword, pFirstName, pLastName, pTel, 
    pMobile, pEmail, pComment, fcmToken, fcmToken_creation);
    
    INSERT INTO ADMISSION (patientID, researcherID, admission_date) VALUES ((SELECT patientID 
		FROM PATIENT WHERE patient_nhsRef = pNhsRef), researcherID, CURRENT_TIMESTAMP());
    
    COMMIT;
    SELECT 'Patient added successfully.';
END