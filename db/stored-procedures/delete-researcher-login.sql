CREATE DEFINER=`COMP2003_X`@`%` PROCEDURE `deleteResearcherLogin`(
	IN sessionIdNo INTEGER
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		ROLLBACK;
		SELECT 'SQLException occurred. Please try again.';
	END;
		
	DELETE FROM RESEARCHERLOGIN WHERE sessionID = sessionIdNo;
	COMMIT;
	SELECT 'Researcher session deleted successfully.';
END