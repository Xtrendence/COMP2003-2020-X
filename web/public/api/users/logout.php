<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	if ($_SERVER['REQUEST_METHOD'] == 'POST') {
		include_once '../config/Database.php';
		include_once '../models/User.php';

		$api_key = isset($_GET['key']) ? $_GET['key'] : die(json_encode(array('message' => 'No API key provided.')));

		if (empty($_POST)) {
			$json = file_get_contents('php://input');
			$_POST = json_decode($json, true);
		}

		$expected = ['patientID'];
		$missing = [];

		$patientID = isset($_POST['patientID']) ? $_POST['patientID'] : array_push($missing, 'patientID');

		$database = new Database();
		if ($database->verify(array('key' => $api_key, 'id' => $patientID))) {
			$db = $database->connect();

			$user = new User($db);
			$user->patientID = $patientID;

			if (empty($missing)) {
				$user->logout();
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