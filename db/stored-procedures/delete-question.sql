CREATE DEFINER=`COMP2003_X`@`%` PROCEDURE `deleteQuestion`(
	IN questionIdNo INTEGER
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		ROLLBACK;
		SELECT 'SQLException occurred. Please try again.';
	END;
		
	DELETE FROM QUESTION WHERE questionID = questionIdNo;
	COMMIT;
	SELECT 'Question deleted successfully.';
END