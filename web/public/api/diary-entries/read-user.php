<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	if ($_SERVER['REQUEST_METHOD'] == 'GET') {
		include_once '../config/Database.php';
		include_once '../models/DiaryEntry.php';

		$api_key = isset($_GET['key']) ? $_GET['key'] : die(json_encode(array('message' => 'No API key provided.')));

		$expected = ['id'];
		$missing = [];

		$database = new Database(false);
		$db = $database->connect($api_key);

		$diaryEntry = new DiaryEntry($db);
		$diaryEntry->patientID = isset($_GET['id']) ? $_GET['id'] : array_push($missing, 'id');

		if(empty($missing)) {
			$result = $diaryEntry->readUser();

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
			die(json_encode(array('expected' => $expected, 'missing' => $missing), JSON_PRETTY_PRINT));
		}
	} else {
		echo json_encode(array('message' => 'Wrong HTTP request method. Use GET instead.'));
	}
?>