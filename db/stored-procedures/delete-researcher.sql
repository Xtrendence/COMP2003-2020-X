CREATE DEFINER=`COMP2003_X`@`%` PROCEDURE `deleteResearcher`(
	IN researcherIdNo INTEGER
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
        SELECT 'SQLException occurred. Please try again.';
	END;
    
    DELETE FROM RESEARCHER WHERE researcherID = researcherIdNo;
    COMMIT;
    SELECT 'Researcher deleted successfully.';
END