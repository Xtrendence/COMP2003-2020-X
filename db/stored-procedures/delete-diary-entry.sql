CREATE DEFINER=`COMP2003_X`@`%` PROCEDURE `deleteDiaryEntry`(
	IN entryIdNo INTEGER
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
        SELECT 'SQLException occurred. Please try again.';
	END;
    
    DELETE FROM DIARYENTRY WHERE entryID = entryIdNo;
    COMMIT;
    SELECT 'Diary entry deleted successfully.';
END