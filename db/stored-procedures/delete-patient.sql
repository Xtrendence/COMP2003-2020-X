CREATE DEFINER=`COMP2003_X`@`%` PROCEDURE `deletePatient`(
	IN patientId INTEGER
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
		BEGIN
			ROLLBACK;
			SELECT 'SQLException has occurred. Please try again.';
		END;
    
    DELETE FROM PATIENT WHERE patientID = patientId;
    COMMIT;
    SELECT 'Patient deleted successfully.';
END