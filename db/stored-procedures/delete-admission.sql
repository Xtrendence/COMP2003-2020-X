CREATE DEFINER=`COMP2003_X`@`%` PROCEDURE `deleteAdmission`(
	IN admissionId INTEGER
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
        SELECT 'SQLException occurred. Please try again.';
	END;
    
    DELETE FROM ADMISSION WHERE admissionID = admissionId;
    COMMIT;
    SELECT 'Admission deleted successfully.';
END