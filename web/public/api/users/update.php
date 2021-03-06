<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
		include_once '../config/Database.php';
		include_once '../models/User.php';

		$api_key = isset($_GET['key']) ? $_GET['key'] : die(json_encode(array('message' => 'No API key provided.')));

		$database = new Database();
		$db = $database->connect($api_key);

		$input = json_decode(file_get_contents('php://input'), true);

		$user = new User($db);
		$user->patientID = isset($input['patientID']) ? $input['patientID'] : die();
		$researcher_username = isset($input['researcher_username']) ? $input['researcher_username'] : die();
		$user->patient_nhsRef = isset($input['patient_nhsRef']) ? $input['patient_nhsRef'] : die();
		$user->patient_username = isset($input['patient_username']) ? $input['patient_username'] : die();
		$user->patient_password = isset($input['patient_password']) ? password_hash($input['patient_password'], PASSWORD_DEFAULT) : die();
		$user->patient_fName = isset($input['patient_fName']) ? $input['patient_fName'] : die();
		$user->patient_lName = isset($input['patient_lName']) ? $input['patient_lName'] : die();
		$user->patient_dob = isset($input['patient_dob']) ? $input['patient_dob'] : die();
		$user->patient_addressI = isset($input['patient_addressI']) ? $input['patient_addressI'] : die();
		$user->patient_addressII = isset($input['patient_addressII']) ? $input['patient_addressII'] : die();
		$user->patient_postcode = isset($input['patient_postcode']) ? $input['patient_postcode'] : die();
		$user->patient_tel = isset($input['patient_tel']) ? $input['patient_tel'] : die();
		$user->patient_mobile = isset($input['patient_mobile']) ? $input['patient_mobile'] : die();
		$user->patient_email = isset($input['patient_email']) ? $input['patient_email'] : die();
		$user->patient_comment = isset($input['patient_comment']) ? $input['patient_comment'] : die();

		$user->update($researcher_username);
	} else {
		echo json_encode(array('message' => 'Wrong HTTP request method. Use PUT instead.'));
	}
?>