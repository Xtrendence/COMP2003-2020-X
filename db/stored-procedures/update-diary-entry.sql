CREATE DEFINER=`COMP2003_X`@`%` PROCEDURE `updateDiaryEntry`(
	IN entryIdNo DECIMAL(10),
    IN entryText VARCHAR(25)
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
        SELECT 'Exception occurred. Please try again.';
    END;
    
    UPDATE DIARYENTRY SET entry = entryText
    WHERE entryID = entryIdNo;
    SELECT 'Diary entry updated successfully.';
END