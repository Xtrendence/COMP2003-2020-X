<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	if ($_SERVER['REQUEST_METHOD'] == 'POST') {
		include_once '../config/Database.php';
		include_once '../models/User.php';

		$expected = [];
		$missing = [];

		$database = new Database(true);
		$db = $database->connect('bypass');

		if (empty($_POST)) {
			$json = file_get_contents('php://input');
			$_POST = json_decode($json, true);
		}
		
		$user = new User($db);
		$user->patient_username = isset($_POST['patient_username']) ? $_POST['patient_username'] : array_push($missing, 'patient_username');
		$user->patient_password = isset($_POST['patient_password']) ? $_POST['patient_password'] : array_push($missing, 'patient_password');
		$user->fcmToken = isset($_POST['fcmToken']) ? $_POST['fcmToken'] : array_push($missing, 'fcmToken');

		if(empty($missing)) {
			$loggedIn = $user->login();

			if ($loggedIn['valid']) {
				echo json_encode(array('valid' => true, 'token' => $database->api_key, 'patientID' => $loggedIn['patientID']));
			} else {
				echo json_encode(array('valid' => false));
			}
		} else {
			die(json_encode(array('expected' => $expected, 'missing' => $missing), JSON_PRETTY_PRINT));
		}
	} else {
		echo json_encode(array('message' => 'Wrong HTTP request method. Use POST instead.'));
	}
?>