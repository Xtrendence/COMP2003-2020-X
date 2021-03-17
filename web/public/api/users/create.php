<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	if ($_SERVER['REQUEST_METHOD'] == 'POST') {
		include_once '../config/Database.php';
		include_once '../models/User.php';

		$api_key = isset($_GET['key']) ? $_GET['key'] : die(json_encode(array('message' => 'No API key provided.')));

		$expected = ['researcherID', 'patient_nhsRef', 'patient_username', 'patient_password', 'patient_password', 'patient_fName', 'patient_lName', 'patient_dob', 'patient_addressI', 'patient_addressII', 'patient_postcode', 'patient_tel', 'patient_mobile', 'patient_email', 'patient_comment'];
		$missing = [];

		$database = new Database();
		
		if ($database->verify(array('key' => $api_key))) {
			$db = $database->connect();

			if (empty($_POST)) {
				$json = file_get_contents('php://input');
				$_POST = json_decode($json, true);
			}

			$user = new User($db);
			$researcherID = isset($_POST['researcherID']) ? $_POST['researcherID'] : array_push($missing, 'researcherID');
			$user->patient_nhsRef = isset($_POST['patient_nhsRef']) ? $_POST['patient_nhsRef'] : array_push($missing, 'patient_nhsRef');
			$user->patient_username = isset($_POST['patient_username']) ? $_POST['patient_username'] : array_push($missing, 'patient_username');
			$user->patient_password = isset($_POST['patient_password']) ? password_hash($_POST['patient_password'], PASSWORD_DEFAULT) : array_push($missing, 'patient_password');
			$user->patient_fName = isset($_POST['patient_fName']) ? $_POST['patient_fName'] : array_push($missing, 'patient_fName');
			$user->patient_lName = isset($_POST['patient_lName']) ? $_POST['patient_lName'] : array_push($missing, 'patient_lName');
			$user->patient_dob = isset($_POST['patient_dob']) ? $_POST['patient_dob'] : array_push($missing, 'patient_dob');
			$user->patient_addressI = isset($_POST['patient_addressI']) ? $_POST['patient_addressI'] : array_push($missing, 'patient_addressI');
			$user->patient_addressII = isset($_POST['patient_addressII']) ? $_POST['patient_addressII'] : array_push($missing, 'patient_addressII');
			$user->patient_postcode = isset($_POST['patient_postcode']) ? $_POST['patient_postcode'] : array_push($missing, 'patient_postcode');
			$user->patient_tel = isset($_POST['patient_tel']) ? $_POST['patient_tel'] : array_push($missing, 'patient_tel');
			$user->patient_mobile = isset($_POST['patient_mobile']) ? $_POST['patient_mobile'] : array_push($missing, 'patient_mobile');
			$user->patient_email = isset($_POST['patient_email']) ? $_POST['patient_email'] : array_push($missing, 'patient_email');
			$user->patient_comment = isset($_POST['patient_comment']) ? $_POST['patient_comment'] : array_push($missing, 'patient_comment');

			if (empty($missing)) {
				$user->create($researcherID);
			} else {
				die(json_encode(array('expected' => $expected, 'missing' => $missing), JSON_PRETTY_PRINT));
			}
		} else {
			echo json_encode(array('message' => 'Invalid API key.'));
		}
	} else {
		echo json_encode(array('message' => 'Wrong HTTP request method. Use POST instead.'));
	}
?>