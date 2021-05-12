CREATE DEFINER=`COMP2003_X`@`%` PROCEDURE `updateChoice`(
	IN choiceIdNo INTEGER,
	IN choiceText VARCHAR(25)
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		ROLLBACK;
		SELECT 'Exception occurred. Please try again.';
	END;
		
	UPDATE CHOICE SET choice = choiceText WHERE choiceID = choiceIdNo;
	SELECT 'Choice updated successfully.';
END