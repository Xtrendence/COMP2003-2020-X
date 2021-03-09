<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
		include_once '../config/Database.php';
		include_once '../models/DiaryEntry.php';

		$api_key = isset($_GET['key']) ? $_GET['key'] : die(json_encode(array('message' => 'No API key provided.')));

		$expected = ['entryID'];
		$missing = [];

		$database = new Database(false);
		$db = $database->connect($api_key);

		$diaryEntry = new DiaryEntry($db);
		
		$input = json_decode(file_get_contents('php://input'), true);

		$diaryEntry->entryID = !empty($input['entryID']) ? $input['entryID'] : array_push($missing, 'entryID');

		if(empty($missing)) {
			$diaryEntry->delete();
		} else {
			die(json_encode(array('expected' => $expected, 'missing' => $missing), JSON_PRETTY_PRINT));
		}
	} else {
		echo json_encode(array('message' => 'Wrong HTTP request method. Use DELETE instead.'));
	}
?>