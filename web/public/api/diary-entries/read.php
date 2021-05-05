<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	if ($_SERVER['REQUEST_METHOD'] == 'GET') {
		include_once '../config/Database.php';
		include_once '../models/DiaryEntry.php';

		$api_key = isset($_GET['key']) ? $_GET['key'] : die(json_encode(array('message' => 'No API key provided.')));

		$expected = ['patientID', 'entryID'];
		$missing = [];

		$patientID = isset($_GET['patientID']) ? $_GET['patientID'] : array_push($missing, 'patientID');

		$database = new Database();
		
		if ($database->verify(array('key' => $api_key, 'id' => $patientID))) {
			$db = $database->connect();

			$diaryEntry = new DiaryEntry($db);
			$diaryEntry->entryID = isset($_GET['entryID']) ? $_GET['entryID'] : array_push($missing, 'entryID');

			if (empty($missing)) {
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
			echo json_encode(array('message' => 'Invalid API key.'));
		}
	} else {
		echo json_encode(array('message' => 'Wrong HTTP request method. Use GET instead.'));
	}
?>