CREATE DEFINER=`COMP2003_X`@`%` PROCEDURE `deleteAdmission`(
	IN admissionIdNo INTEGER
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		ROLLBACK;
		SELECT 'SQLException occurred. Please try again.';
	END;
		
	DELETE FROM ADMISSION WHERE admissionID = admissionIdNo;
	COMMIT;
	SELECT 'Admission deleted successfully.';
END