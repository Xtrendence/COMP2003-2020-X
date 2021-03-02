CREATE DEFINER=`COMP2003_X`@`%` PROCEDURE `deleteDiaryEntry`(
	IN entryId INTEGER
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
        SELECT 'SQLException occurred. Please try again.';
	END;
    
    DELETE FROM DIARYENTRY WHERE entryID = entryId;
    COMMIT;
    SELECT 'Diary entry deleted successfully.';
END