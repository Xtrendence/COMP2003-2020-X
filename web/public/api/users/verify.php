<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	if ($_SERVER['REQUEST_METHOD'] == 'GET') {
		include_once '../config/Database.php';

		$api_key = isset($_GET['key']) ? $_GET['key'] : die(json_encode(array('message' => 'No API key provided.')));

		$patientID = explode("$", $api_key)[2];

		$database = new Database();

		if ($database->verify(array('key' => $api_key, 'id' => $patientID))) {
			echo json_encode(array('valid' => true, 'patientID' => $patientID, 'token' => $api_key));
		} else {
			echo json_encode(array('message' => 'Invalid API key.'));
		}
	} else {
		echo json_encode(array('message' => 'Wrong HTTP request method. Use GET instead.'));
	}
?>