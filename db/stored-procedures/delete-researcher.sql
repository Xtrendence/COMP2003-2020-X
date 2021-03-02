CREATE DEFINER=`COMP2003_X`@`%` PROCEDURE `deleteResearcher`(
	IN researcherId INTEGER
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
        SELECT 'SQLException occurred. Please try again.';
	END;
    
    DELETE FROM RESEARCHER WHERE researcherID = researcherId;
    COMMIT;
    SELECT 'Researcher deleted successfully.';
END