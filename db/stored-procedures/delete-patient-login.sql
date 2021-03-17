CREATE DEFINER=`COMP2003_X`@`%` PROCEDURE `deletePatientLogin`(
	IN sessionIdNo INTEGER
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
        SELECT 'SQLException occurred. Please try again.';
	END;
    
    DELETE FROM PATIENTLOGIN WHERE sessionID = sessionIdNo;
    COMMIT;
    SELECT 'Patient session deleted successfully.';
END