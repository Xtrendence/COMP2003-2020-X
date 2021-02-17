CREATE DEFINER=`COMP2003_X`@`%` PROCEDURE `createAnswer`(
	IN questionID INTEGER,
    IN patientID INTEGER,
    IN answer VARCHAR(1000)
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
        SELECT 'SQLException has occurred. Please try again.';
	END;
    
	INSERT INTO ANSWER (questionID, patientID, answer) VALUES (questionID, patientID, answer);    
    
    COMMIT;
    SELECT 'Answer added successfully.';
END