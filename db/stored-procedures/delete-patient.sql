CREATE DEFINER=`COMP2003_X`@`%` PROCEDURE `deletePatient`(
	IN patientIdNo INTEGER
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
		BEGIN
			ROLLBACK;
			SELECT 'SQLException has occurred. Please try again.';
		END;
    
    DELETE FROM PATIENT WHERE patientID = patientIdNo;
    COMMIT;
    SELECT 'Patient deleted successfully.';
END