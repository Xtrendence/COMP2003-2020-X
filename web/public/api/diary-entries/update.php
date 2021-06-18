<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
		include_once '../config/Database.php';
		include_once '../models/DiaryEntry.php';

		$api_key = isset($_GET['key']) ? $_GET['key'] : die(json_encode(array('message' => 'No API key provided.')));
		
		$input = json_decode(file_get_contents('php://input'), true);

		$expected = ['patientID', 'entryID', 'entry'];
		$missing = [];

		$patientID = !empty($input['patientID']) ? $input['patientID'] : array_push($missing, 'patientID');

		$database = new Database();
		
		if ($database->verify(array('key' => $api_key, 'id' => $patientID))) {
			$db = $database->connect();

			$diaryEntry = new DiaryEntry($db);

			$diaryEntry->entryID = !empty($input['entryID']) ? $input['entryID'] : array_push($missing, 'entryID');
			$diaryEntry->entry = !empty($input['entry']) ? htmlspecialchars($input['entry']) : array_push($missing, 'entry');

			if (empty($missing)) {
				$diaryEntry->update();
			} else {
				die(json_encode(array('expected' => $expected, 'missing' => $missing), JSON_PRETTY_PRINT));
			}
		} else {
			echo json_encode(array('message' => 'Invalid API key.'));
		}
	} else {
		echo json_encode(array('message' => 'Wrong HTTP request method. Use PUT instead.'));
	}
?>