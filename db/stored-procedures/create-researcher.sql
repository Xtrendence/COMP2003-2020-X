CREATE DEFINER=`COMP2003_X`@`%` PROCEDURE `createResearcher`(
	IN rNhsRef DECIMAL(10),
	IN rUsername VARCHAR(25),
	IN rPassword VARCHAR(76),
	IN rFirstName VARCHAR(25),
	IN rLastName VARCHAR(25),
	IN rTel VARCHAR(11),
	IN rMobile VARCHAR(13),
	IN rEmail VARCHAR(1000)
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		ROLLBACK;
		SELECT 'SQLException has occurred. Please try again.';
	END;
		
	INSERT INTO RESEARCHER (researcher_nhsRef, researcher_username, researcher_password, researcher_fName, 
	researcher_lName, researcher_tel, researcher_mobile, researcher_email) VALUES (rNhsRef, rUsername,
	rPassword, rFirstName, rLastName, rTel, rMobile, rEmail);
	COMMIT;
	SELECT 'Researcher added successfully.';
END