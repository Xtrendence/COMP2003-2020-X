CREATE DEFINER=`COMP2003_X`@`%` PROCEDURE `createResearcherLogin`(
    IN researcherID INTEGER,
    IN loginToken VARCHAR(128)
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
        SELECT 'SQLException has occurred. Please try again.';
	END;
    
	INSERT INTO RESEARCHERLOGIN (researcherID, login_date, login_status, login_token) 
		VALUES (researcherID, CURRENT_TIMESTAMP(), TRUE, loginToken);    
    
    COMMIT;
    SELECT 'Researcher login added successfully.';
END