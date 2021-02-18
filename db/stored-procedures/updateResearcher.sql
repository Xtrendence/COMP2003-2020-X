CREATE DEFINER=`COMP2003_X`@`%` PROCEDURE `updateResearcher`(
	IN rNhsRef DECIMAL(10),
    IN rUsername VARCHAR(25),
    IN rPassword VARCHAR(76),
    IN rFName VARCHAR(25),
    IN rLName VARCHAR(25),
    IN rTel VARCHAR(11),
    IN rMobile VARCHAR(13),
    IN rEmail VARCHAR(1000)
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
        SELECT 'Exception occurred. Please try again.';
    END;
    
    UPDATE RESEARCHER SET
    researcher_username = rUsername,
    researcher_password = rPassword,
    researcher_fName = rFName,
    researcher_lName = rLName,
    researcher_tel = rTel,
    researcher_mobile = rMobile,
    researcher_email = rEmail
    WHERE researcher_nhsRef = rNhsRef;
    
    SELECT 'Researcher updated successfully.';
END