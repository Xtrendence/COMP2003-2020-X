CREATE DEFINER=`COMP2003_X`@`%` PROCEDURE `createFall`(
    IN patientID INTEGER
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
        SELECT 'SQLException has occurred. Please try again.';
	END;
    
	INSERT INTO FALL (patientID, fall_date) VALUES (patientID, CURRENT_TIMESTAMP());    
    
    COMMIT;
    SELECT 'Fall added successfully.';
END