CREATE DEFINER=`COMP2003_X`@`%` PROCEDURE `updateAnswer`(
	IN answerId INTEGER,
    IN answer VARCHAR(1000)
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
        SELECT 'Exception occurred. Please try again.';
    END;
    
    UPDATE ANSWER SET answer = answer WHERE answerID = answerId;
    SELECT 'Answer updated successfully.';
END