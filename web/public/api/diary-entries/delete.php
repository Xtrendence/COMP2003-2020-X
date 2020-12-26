<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
		include_once '../config/Database.php';
		include_once '../models/DiaryEntry.php';

		$api_key = isset($_GET['key']) ? $_GET['key'] : die(json_encode(array('message' => 'No API key provided.')));

		$database = new Database();
		$db = $database->connect($api_key);

		$diaryEntry = new DiaryEntry($db);
		
		$input = json_decode(file_get_contents('php://input'), true);

		$diaryEntry->entryID = !empty($input['entryID']) ? $input['entryID'] : die();

		$diaryEntry->delete();
	} else {
		echo json_encode(array('message' => 'Wrong HTTP request method. Use DELETE instead.'));
	}
?>