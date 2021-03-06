<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
		include_once '../config/Database.php';
		include_once '../models/Fall.php';

		$api_key = isset($_GET['key']) ? $_GET['key'] : die(json_encode(array('message' => 'No API key provided.')));

		$expected = [];
		$missing = [];

		$database = new Database();
		$db = $database->connect($api_key);

		$fall = new Fall($db);
		
		$input = json_decode(file_get_contents('php://input'), true);

		$fall->fallID = !empty($input['fallID']) ? $input['fallID'] : array_push($missing, 'fallID');

		if(empty($missing)) {
			$fall->delete();
		} else {
			die(json_encode(array('expected' => $expected, 'missing' => $missing), JSON_PRETTY_PRINT));
		}
	} else {
		echo json_encode(array('message' => 'Wrong HTTP request method. Use DELETE instead.'));
	}
?>