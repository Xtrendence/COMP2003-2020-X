<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
		include_once '../config/Database.php';
		include_once '../models/User.php';

		$api_key = isset($_GET['key']) ? $_GET['key'] : die(json_encode(array('message' => 'No API key provided.')));

		$expected = [];
		$missing = [];

		$database = new Database(false);
		$db = $database->connect($api_key);

		$input = json_decode(file_get_contents('php://input'), true);

		$user = new User($db);
		$researcherID = isset($input['researcherID']) ? $input['researcherID'] : array_push($missing, 'researcherID');
		$user->patient_nhsRef = isset($input['patient_nhsRef']) ? $input['patient_nhsRef'] : array_push($missing, 'patient_nhsRef');
		$user->patient_username = isset($input['patient_username']) ? $input['patient_username'] : array_push($missing, 'patient_username');
		$user->patient_password = isset($input['patient_password']) ? password_hash($input['patient_password'], PASSWORD_DEFAULT) : array_push($missing, 'patient_password');
		$user->patient_fName = isset($input['patient_fName']) ? $input['patient_fName'] : array_push($missing, 'patient_fName');
		$user->patient_lName = isset($input['patient_lName']) ? $input['patient_lName'] : array_push($missing, 'patient_lName');
		$user->patient_dob = isset($input['patient_dob']) ? $input['patient_dob'] : array_push($missing, 'patient_dob');
		$user->patient_addressI = isset($input['patient_addressI']) ? $input['patient_addressI'] : array_push($missing, 'patient_addressI');
		$user->patient_addressII = isset($input['patient_addressII']) ? $input['patient_addressII'] : array_push($missing, 'patient_addressII');
		$user->patient_postcode = isset($input['patient_postcode']) ? $input['patient_postcode'] : array_push($missing, 'patient_postcode');
		$user->patient_tel = isset($input['patient_tel']) ? $input['patient_tel'] : array_push($missing, 'patient_tel');
		$user->patient_mobile = isset($input['patient_mobile']) ? $input['patient_mobile'] : array_push($missing, 'patient_mobile');
		$user->patient_email = isset($input['patient_email']) ? $input['patient_email'] : array_push($missing, 'patient_email');
		$user->patient_comment = isset($input['patient_comment']) ? $input['patient_comment'] : array_push($missing, 'patient_comment');

		if (empty($missing)) {
			$user->update();
		} else {
			die(json_encode(array('expected' => $expected, 'missing' => $missing), JSON_PRETTY_PRINT));
		}
	} else {
		echo json_encode(array('message' => 'Wrong HTTP request method. Use PUT instead.'));
	}
?>