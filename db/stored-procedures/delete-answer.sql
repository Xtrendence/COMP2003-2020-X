CREATE DEFINER=`COMP2003_X`@`%` PROCEDURE `deleteAnswer`(
	IN answerId INTEGER
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
        SELECT 'SQLException occurred. Please try again.';
	END;
    
    DELETE FROM ANSWER WHERE answerID = answerId;
    COMMIT;
    SELECT 'Answer deleted successfully.';
END