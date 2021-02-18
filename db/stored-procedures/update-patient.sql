CREATE DEFINER=`COMP2003_X`@`%` PROCEDURE `updatePatient`(
	IN pNhsRef DECIMAL(10),
    IN pUsername VARCHAR(25),
    IN pPassword VARCHAR(76),
    IN pFName VARCHAR(25),
    IN pLName VARCHAR(25),
    IN pAddressI VARCHAR(45),
    IN pAddressII VARCHAR(45),
    IN pPostcode VARCHAR(7),
    IN pTel VARCHAR(11),
    IN pMobile VARCHAR(13),
    IN pEmail VARCHAR(1000),
    IN pComment VARCHAR(1000),
    IN pFCMToken VARCHAR(1000),
    IN pFCMToken_Creation DATETIME
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
        SELECT 'Exception occurred. Please try again.';
    END;
    
    UPDATE PATIENT SET
    patient_username = pUsername,
    patient_password = pPassword,
    patient_fName = pFName,
    patient_lName = pLName,
    patient_addressI = pAddressI,
    patient_addressII = pAddressII,
    patient_postcode = pPostcode,
    patient_tel = pTel,
    patient_mobile = pMobile,
    patient_email = pEmail,
    patient_comment = pComment,
    fcmToken = pFCMToken,
    fcmToken_creation = pFCMToken_Creation
    WHERE patient_nhsRef = pNhsRef;
    
    SELECT 'Patient updated successfully.';
END
