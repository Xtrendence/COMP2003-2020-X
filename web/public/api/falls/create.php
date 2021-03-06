<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	if ($_SERVER['REQUEST_METHOD'] == 'POST') {
		include_once '../config/Database.php';
		include_once '../models/Fall.php';

		$api_key = isset($_GET['key']) ? $_GET['key'] : die(json_encode(array('message' => 'No API key provided.')));

		$expected = [];
		$missing = [];

		$database = new Database();
		$db = $database->connect($api_key);

		if (empty($_POST)) {
			$json = file_get_contents('php://input');
			$_POST = json_decode($json, true);
		}

		$fall = new Fall($db);
		$fall->patientID = isset($_POST['patientID']) ? $_POST['patientID'] : array_push($missing, 'patientID');
		$falls = isset($_POST['falls']) ? $_POST['falls'] : array_push($missing, 'falls');

		if(empty($missing)) {
			$fall->create($falls);
		} else {
			die(json_encode(array('expected' => $expected, 'missing' => $missing), JSON_PRETTY_PRINT));
		}
	} else {
		echo json_encode(array('message' => 'Wrong HTTP request method. Use POST instead.'));
	}
?>