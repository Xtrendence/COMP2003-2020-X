<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	if ($_SERVER['REQUEST_METHOD'] == 'GET') {
		include_once '../config/Database.php';
		include_once '../models/DiaryEntry.php';

		$api_key = isset($_GET['key']) ? $_GET['key'] : die(json_encode(array('message' => 'No API key provided.')));

		$database = new Database();
		
		if ($database->verify(array('key' => $api_key))) {
			$db = $database->connect();

			$diaryEntry = new DiaryEntry($db);

			$result = $diaryEntry->readAll();

			$rows = $result->rowCount();

			if ($rows > 0) {
				$array = array();
				$array['data'] = array();
				while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
					extract($row);

					$item = array(
						'entryID' => $entryID,
						'patientID' => $patientID,
						'entry_date' => $entry_date,
						'entry' => $entry
					);

					array_push($array['data'], $item);
				}

				echo json_encode($array, JSON_PRETTY_PRINT);
			} else {
				echo json_encode(array('message' => 'No diary entries found.'));
			}
		} else {
			echo json_encode(array('message' => 'Invalid API key.'));
		}
	} else {
		echo json_encode(array('message' => 'Wrong HTTP request method. Use GET instead.'));
	}
?>