<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
		include_once '../config/Database.php';
		include_once '../models/User.php';

		$api_key = isset($_GET['key']) ? $_GET['key'] : die(json_encode(array('message' => 'No API key provided.')));

		$database = new Database();
		$db = $database->connect($api_key);

		if (empty($_POST)) {
			$json = file_get_contents('php://input');
			$_POST = json_decode($json, true);
		}

		$user = new User($db);
		$user->patientID = isset($_POST['patientID']) ? $_POST['patientID'] : die();
		$researcher_username = isset($_POST['researcher_username']) ? $_POST['researcher_username'] : die();
		$user->patient_nhsRef = isset($_POST['patient_nhsRef']) ? $_POST['patient_nhsRef'] : die();
		$user->patient_username = isset($_POST['patient_username']) ? $_POST['patient_username'] : die();
		$user->patient_password = isset($_POST['patient_password']) ? $_POST['patient_password'] : die();
		$user->patient_fName = isset($_POST['patient_fName']) ? $_POST['patient_fName'] : die();
		$user->patient_lName = isset($_POST['patient_lName']) ? $_POST['patient_lName'] : die();
		$user->patient_dob = isset($_POST['patient_dob']) ? $_POST['patient_dob'] : die();
		$user->patient_addressI = isset($_POST['patient_addressI']) ? $_POST['patient_addressI'] : die();
		$user->patient_addressII = isset($_POST['patient_addressII']) ? $_POST['patient_addressII'] : die();
		$user->patient_postcode = isset($_POST['patient_postcode']) ? $_POST['patient_postcode'] : die();
		$user->patient_tel = isset($_POST['patient_tel']) ? $_POST['patient_tel'] : die();
		$user->patient_mobile = isset($_POST['patient_mobile']) ? $_POST['patient_mobile'] : die();
		$user->patient_email = isset($_POST['patient_email']) ? $_POST['patient_email'] : die();
		$user->patient_comment = isset($_POST['patient_comment']) ? $_POST['patient_comment'] : die();

		$user->update($researcher_username);
	} else {
		echo json_encode(array('message' => 'Wrong HTTP request method. Use PUT instead.'));
	}
?>