CREATE DEFINER=`COMP2003_X`@`%` PROCEDURE `createDiaryEntry`(
    IN patientID INTEGER,
    IN entry VARCHAR(25)
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
        SELECT 'SQLException has occurred. Please try again.';
	END;
    
	INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (patientID, CURRENT_TIMESTAMP(), entry);    
    
    COMMIT;
    SELECT 'Diary entry added successfully.';
END