<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
		include_once '../config/Database.php';
		include_once '../models/Question.php';

		$api_key = isset($_GET['key']) ? $_GET['key'] : die(json_encode(array('message' => 'No API key provided.')));

		$expected = ['questionID'];
		$missing = [];

		$database = new Database();

		if ($database->verify(array('key' => $api_key))) {
			$db = $database->connect();

			$question = new Question($db);
			
			$input = json_decode(file_get_contents('php://input'), true);

			$question->questionID = !empty($input['questionID']) ? $input['questionID'] : array_push($missing, 'questionID');

			if (empty($missing)) {
				$question->delete();
			} else {
				die(json_encode(array('expected' => $expected, 'missing' => $missing), JSON_PRETTY_PRINT));
			}
		} else {
			echo json_encode(array('message' => 'Invalid API key.'));
		}
	} else {
		echo json_encode(array('message' => 'Wrong HTTP request method. Use DELETE instead.'));
	}
?>