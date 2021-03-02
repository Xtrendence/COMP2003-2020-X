CREATE DEFINER=`COMP2003_X`@`%` PROCEDURE `deleteFall`(
	IN fallId INTEGER
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
        SELECT 'SQLException occurred. Please try again.';
	END;
    
    DELETE FROM FALL WHERE fallID = fallId;
    COMMIT;
    SELECT 'Fall deleted successfully.';
END