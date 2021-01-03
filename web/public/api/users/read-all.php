<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	if ($_SERVER['REQUEST_METHOD'] == 'GET') {
		include_once '../config/Database.php';
		include_once '../models/User.php';

		$api_key = isset($_GET['key']) ? $_GET['key'] : die(json_encode(array('message' => 'No API key provided.')));

		$database = new Database();
		$db = $database->connect($api_key);

		$user = new User($db);

		$result = $user->readAll();

		$rows = $result->rowCount();

		if ($rows > 0) {
			$array = array();
			$array['data'] = array();
			while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
				extract($row);

				$item = array(
					'patientID' => $patientID,
					'patient_nhsRef' => $patient_nhsRef,
					'patient_username' => $patient_username,
					'patient_password' => $patient_password,
					'patient_fName' => $patient_fName,
					'patient_lName' => $patient_lName,
					'patient_dob' => $patient_dob,
					'patient_addressI' => $patient_addressI,
					'patient_addressII' => $patient_addressII,
					'patient_postcode' => $patient_postcode,
					'patient_tel' => $patient_tel,
					'patient_mobile' => $patient_mobile,
					'patient_email' => $patient_email,
					'patient_comment' => $patient_comment,
					'fcmToken' => $fcmToken,
					'fcmToken_creation' => $fcmToken_creation
				);

				array_push($array['data'], $item);
			}

			echo json_encode($array, JSON_PRETTY_PRINT);
		} else {
			echo json_encode(array('message' => 'No users found.'));
		}
	} else {
		echo json_encode(array('message' => 'Wrong HTTP request method. Use GET instead.'));
	}
?>