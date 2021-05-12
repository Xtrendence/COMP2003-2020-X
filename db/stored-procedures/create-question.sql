CREATE DEFINER=`COMP2003_X`@`%` PROCEDURE `createQuestion`(
	IN question VARCHAR(1000),
	IN qCharLim INTEGER,
	IN qType VARCHAR(25)
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		ROLLBACK;
		SELECT 'SQLException has occurred. Please try again.';
	END;
		
	INSERT INTO QUESTION (question, question_charLim, question_type) VALUES (question, qCharLim, qType);	
		
	COMMIT;
	SELECT 'Question added successfully.';
END