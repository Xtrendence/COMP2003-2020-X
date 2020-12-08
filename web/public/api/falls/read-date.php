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
		$fall->patientID = isset($_GET['id']) ? $_GET['id'] : die();

		$from = isset($_GET['from']) ? $_GET['from'] : die();
		$to = isset($_GET['to']) ? $_GET['to'] : die();

		$result = $fall->readDate($from, $to);

		$rows = $result->rowCount();
		
		if ($rows > 0) {
			$array = array();
			$array['data'] = array();
			while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
				extract($row);
		
				$item = array(
					'fallID' => $fallID,
					'patientID' => $patientID,
					'fall_date' => $fall_date
				);
		
				array_push($array['data'], $item);
			}
		
			echo json_encode($array, JSON_PRETTY_PRINT);
		} else {
			echo json_encode(array('message' => 'No falls found.'));
		}
	} else {
		echo json_encode(array('message' => 'Wrong HTTP request method. Use GET instead.'));
	}
?>