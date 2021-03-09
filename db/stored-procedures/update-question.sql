CREATE DEFINER=`COMP2003_X`@`%` PROCEDURE `updateQuestion`(
	IN questionId INTEGER,
    IN question VARCHAR(1000),
    IN questionCharacterLimit INTEGER,
    IN questionType VARCHAR(25)
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
        SELECT 'Exception occurred. Please try again.';
    END;
    
    IF (question IS NOT NULL) THEN 
		UPDATE QUESTION SET question = question WHERE questionID = questionId; 
	END IF;
    
    IF (questionCharacterLimit IS NOT NULL) THEN 
		UPDATE QUESTION SET question_charLim = questionCharacterLimit; 
	END IF;
    
    IF (questionType IS NOT NULL) THEN 
		UPDATE QUESTION SET question_type = questionType; 
	END IF;
    
    SELECT 'Question updated successfully.';
END