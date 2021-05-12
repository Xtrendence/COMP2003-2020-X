CREATE DEFINER=`COMP2003_X`@`%` PROCEDURE `updateAdmission`(
	IN researcherNHSRef DECIMAL(10),
	IN patientNHSRef DECIMAL(10)
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		ROLLBACK;
		SELECT 'Exception occurred. Please try again.';
	END;
		
	UPDATE ADMISSION SET
	researcherID = (SELECT researcherID FROM RESEARCHER WHERE researcher_nhsRef = researcherNHSRef )
	WHERE patientID = (SELECT patientID FROM PATIENT WHERE patient_nhsRef = patientNHSRef);
	SELECT 'Admission updated successfully.';
END
