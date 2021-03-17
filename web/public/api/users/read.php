<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	if ($_SERVER['REQUEST_METHOD'] == 'GET') {
		include_once '../config/Database.php';
		include_once '../models/User.php';

		$api_key = isset($_GET['key']) ? $_GET['key'] : die(json_encode(array('message' => 'No API key provided.')));

		$expected = ['id'];
		$missing = [];

		$database = new Database(false);
		$db = $database->connect($api_key);

		$user = new User($db);
		$user->patientID = isset($_GET['id']) ? $_GET['id'] : array_push($missing, 'id');

		if (empty($missing)) {
			$user->read();

			if (!empty($user->patientID)) {
				$item = array(
					'patientID' => $user->patientID,
					'patient_nhsRef' => $user->patient_nhsRef,
					'patient_username' => $user->patient_username,
					'patient_password' => $user->patient_password,
					'patient_fName' => $user->patient_fName,
					'patient_lName' => $user->patient_lName,
					'patient_dob' => $user->patient_dob,
					'patient_addressI' => $user->patient_addressI,
					'patient_addressII' => $user->patient_addressII,
					'patient_postcode' => $user->patient_postcode,
					'patient_tel' => $user->patient_tel,
					'patient_mobile' => $user->patient_mobile,
					'patient_email' => $user->patient_email,
					'patient_comment' => $user->patient_comment,
					'fcmToken' => $user->fcmToken,
					'fcmToken_creation' => $user->fcmToken_creation
				);

				echo json_encode($item, JSON_PRETTY_PRINT);
			} else {
				echo json_encode(array('message' => 'User not found.'));
			}
		} else {
			die(json_encode(array('expected' => $expected, 'missing' => $missing), JSON_PRETTY_PRINT));
		}
	} else {
		echo json_encode(array('message' => 'Wrong HTTP request method. Use GET instead.'));
	}
?>