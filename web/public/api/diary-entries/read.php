<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	if ($_SERVER['REQUEST_METHOD'] == 'GET') {
		include_once '../config/Database.php';
		include_once '../models/DiaryEntry.php';

		$api_key = isset($_GET['key']) ? $_GET['key'] : die(json_encode(array('message' => 'No API key provided.')));

		$expected = ['id'];
		$missing = [];

		$database = new Database();
		$db = $database->connect($api_key);

		$diaryEntry = new DiaryEntry($db);
		$diaryEntry->entryID = isset($_GET['id']) ? $_GET['id'] : array_push($missing, 'id');

		if(empty($missing)) {
			$diaryEntry->read();

			if (!empty($diaryEntry->entryID)) {
				$item = array(
					'entryID' => $diaryEntry->entryID,
					'patientID' => $diaryEntry->patientID,
					'entry_date' => $diaryEntry->entry_date,
					'entry' => $diaryEntry->entry
				);

				echo json_encode($item, JSON_PRETTY_PRINT);
			} else {
				echo json_encode(array('message' => 'No diary entry found.'));
			}
		} else {
			die(json_encode(array('expected' => $expected, 'missing' => $missing), JSON_PRETTY_PRINT));
		}
	} else {
		echo json_encode(array('message' => 'Wrong HTTP request method. Use GET instead.'));
	}
?>