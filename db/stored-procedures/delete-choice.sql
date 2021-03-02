CREATE DEFINER=`COMP2003_X`@`%` PROCEDURE `deleteChoice`(
	IN choiceId INTEGER
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
        SELECT 'SQLException occurred. Please try again.';
	END;
    
    DELETE FROM CHOICE WHERE choiceID = choiceId;
    COMMIT;
    SELECT 'Choice deleted successfully.';
END