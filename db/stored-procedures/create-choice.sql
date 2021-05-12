CREATE DEFINER=`COMP2003_X`@`%` PROCEDURE `createChoice`(
	IN questionID INTEGER,
	IN choice VARCHAR(25)
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		ROLLBACK;
		SELECT 'SQLException has occurred. Please try again.';
	END;
		
	INSERT INTO CHOICE (questionID, choice) VALUES (questionID, choice);	
		
	COMMIT;
	SELECT 'Choice added successfully.';
END