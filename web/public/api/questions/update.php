<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
		include_once '../config/Database.php';
		include_once '../models/Question.php';

		$api_key = isset($_GET['key']) ? $_GET['key'] : die(json_encode(array('message' => 'No API key provided.')));

		$missing = [];
		$choices = [];

		$database = new Database();

		if ($database->verify(array('key' => $api_key))) {
			$db = $database->connect();

			$input = json_decode(file_get_contents('php://input'), true);
			
			$question = new Question($db);
			$question->questionID = isset($input['questionID']) ? $input['questionID'] : array_push($missing, 'questionID');
			$question->question = isset($input['question']) ? $input['question'] : array_push($missing, 'question');
			$question->question_type = isset($input['question_type']) ? $input['question_type'] : array_push($missing, 'question_type');
			
			if ($question->question_type == 'custom') {
				$expected = ['questionID', 'question', 'question_type', 'question_charLim'];
				$question->question_charLim = isset($input['question_charLim']) ? $input['question_charLim'] : array_push($missing, 'question_charLim');
			} else {
				$expected = ['questionID', 'question', 'question_type', 'choices'];
				$choices = isset($input['choices']) ? $input['choices'] : array_push($missing, 'choices');
			}

			if (empty($missing)) {
				$question->update($choices);
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