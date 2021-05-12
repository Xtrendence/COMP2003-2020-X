CREATE DEFINER=`COMP2003_X`@`%` PROCEDURE `updateFall`(
	IN fallIdNo INTEGER,
	IN fallDate DATETIME
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		ROLLBACK;
		SELECT 'Exception occurred. Please try again.';
	END;
		
	UPDATE FALL SET fall_date = fallDate
	WHERE fallID = fallIdNo;
	SELECT 'Fall updated successfully.';
END