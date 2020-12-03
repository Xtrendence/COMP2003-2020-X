<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	if($_SERVER['REQUEST_METHOD'] == 'GET') {
		include_once '../config/Database.php';
		include_once '../models/Fall.php';

		$database = new Database();
		$db = $database->connect();

		$fall = new Fall($db);

		$result = $fall->readAll();

		$rows = $result->rowCount();

		if($rows > 0) {
			$array = array();
			$array['data'] = array();
			while($row = $result->fetch(PDO::FETCH_ASSOC)) {
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