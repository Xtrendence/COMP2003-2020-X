CREATE DEFINER=`COMP2003_X`@`%` PROCEDURE `updateChoice`(
	IN choiceId INTEGER,
    IN choice VARCHAR(25)
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
        SELECT 'Exception occurred. Please try again.';
    END;
    
    UPDATE CHOICE SET choice = choice WHERE choiceID = choiceId;
    SELECT 'Choice updated successfully.';
END