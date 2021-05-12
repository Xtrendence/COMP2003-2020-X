CREATE DEFINER=`COMP2003_X`@`%` PROCEDURE `deleteChoice`(
	IN choiceIdNo INTEGER
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		ROLLBACK;
		SELECT 'SQLException occurred. Please try again.';
	END;
		
	DELETE FROM CHOICE WHERE choiceID = choiceIdNo;
	COMMIT;
	SELECT 'Choice deleted successfully.';
END