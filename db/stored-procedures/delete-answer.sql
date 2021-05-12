CREATE DEFINER=`COMP2003_X`@`%` PROCEDURE `deleteAnswer`(
	IN answerIdNo INTEGER
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		ROLLBACK;
		SELECT 'SQLException occurred. Please try again.';
	END;
		
	DELETE FROM ANSWER WHERE answerID = answerIdNo;
	COMMIT;
	SELECT 'Answer deleted successfully.';
END