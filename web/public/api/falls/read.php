<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	if ($_SERVER['REQUEST_METHOD'] == 'GET') {
		include_once '../config/Database.php';
		include_once '../models/Fall.php';

		$api_key = isset($_GET['key']) ? $_GET['key'] : die(json_encode(array('message' => 'No API key provided.')));

		$database = new Database();
		$db = $database->connect($api_key);

		$fall = new Fall($db);
		$fall->fallID = isset($_GET['id']) ? $_GET['id'] : die();

		$fall->read();

		if (!empty($fall->fallID)) {
			$item = array(
				'fallID' => $fall->fallID,
				'patientID' => $fall->patientID,
				'fall_date' => $fall->fall_date
			);

			echo json_encode($item, JSON_PRETTY_PRINT);
		} else {
			echo json_encode(array('message' => 'Fall not found.'));
		}
	} else {
		echo json_encode(array('message' => 'Wrong HTTP request method. Use GET instead.'));
	}
?>