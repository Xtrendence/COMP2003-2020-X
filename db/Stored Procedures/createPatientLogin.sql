CREATE DEFINER=`COMP2003_X`@`%` PROCEDURE `createPatientLogin`(
    IN patientID INTEGER,
    IN loginToken VARCHAR(128)
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
        SELECT 'SQLException has occurred. Please try again.';
	END;
    
	INSERT INTO PATIENTLOGIN (patientID, login_date, login_status, login_token) 
		VALUES (patientID, CURRENT_TIMESTAMP(), TRUE, loginToken);    
    
    COMMIT;
    SELECT 'Patient login added successfully.';
END