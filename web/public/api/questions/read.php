<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	if ($_SERVER['REQUEST_METHOD'] == 'GET') {
		include_once '../config/Database.php';
		include_once '../models/Question.php';

		$api_key = isset($_GET['key']) ? $_GET['key'] : die(json_encode(array('message' => 'No API key provided.')));

		$expected = ['id'];
		$missing = [];

		$database = new Database();

		if ($database->verify(array('key' => $api_key))) {
			$db = $database->connect();

			
			$choices = [];

			$question = new Question($db);
			$question->questionID = isset($_GET['id']) ? $_GET['id'] : array_push($missing, 'id');

			if (empty($missing)){
				$question->read($choices);

				if (!empty($question->questionID)) {
					if ($question->question_type == 'custom') {
						$item = array(
							'questionID' => $question->questionID,
							'question' => $question->question,
							'question_charlim' => $question->question_charLim,
							'question_type' => $question->question_type
						);

					} else {
						$item = array(
							'questionID' => $question->questionID,
							'question' => $question->question,
							'question_type' => $question->question_type,
							'choices' => array()
						);
						
						for ($i = 0; $i < count($choices); $i++) {
							$item['choices'][$i + 1] = $choices[$i];
						}
					}

					echo json_encode($item, JSON_PRETTY_PRINT);
				} else {
					echo json_encode(array('message' => 'No questions found.'));
				}
			} else {
				die(json_encode(array('expected' => $expected, 'missing' =>$missing), JSON_PRETTY_PRINT));
			}
		} else {
			echo json_encode(array('message' => 'Invalid API key.'));
		}
	} else {
		echo json_encode(array('message' => 'Wrong HTTP request method. Use GET instead.'));
	}

?>