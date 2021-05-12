CREATE DEFINER=`COMP2003_X`@`%` PROCEDURE `updateAnswer`(
	IN answerIdNo INTEGER,
	IN answerText VARCHAR(1000)
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		ROLLBACK;
		SELECT 'Exception occurred. Please try again.';
	END;
		
	UPDATE ANSWER SET answer = answerText WHERE answerID = answerIdNo;
	SELECT 'Answer updated successfully.';
END