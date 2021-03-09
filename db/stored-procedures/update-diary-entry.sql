CREATE DEFINER=`COMP2003_X`@`%` PROCEDURE `updateDiaryEntry`(
	IN entryId DECIMAL(10),
    IN entry DECIMAL(10)
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
        SELECT 'Exception occurred. Please try again.';
    END;
    
    UPDATE DIARYENTRY SET entry = entry
    WHERE entryID = entryId;
    SELECT 'Diary entry updated successfully.';
END