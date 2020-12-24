<?php
header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	if ($_SERVER['REQUEST_METHOD'] == 'GET') {
		include_once '../config/Database.php';
		include_once '../models/Question.php';

		$api_key = isset($_GET['key']) ? $_GET['key'] : die(json_encode(array('message' => 'No API key provided.')));

		$database = new Database();
		$db = $database->connect($api_key);
		
		$question = new Question($db);
		$question->questionID = isset($_GET['id']) ? $_GET['id'] : die();
		
		$question->read();

		if (!empty($question->questionID)) {
			if ($question->question_type == "custom") {
				$item = array(
					'questionID' => $questionID,
					'question' => $question,
					'question_charlim' => $question_charLim,
					'question_type' => $question_type
				);

			} else {
				$item = array(
					'questionID' => $questionID,
					'question' => $question,
					'question_type' => $question_type,
					'choices' => array()							
				);
				
				for ($i = 0; $i <= count($choices); $i++) {
					$item['choices'][$i + 1] = $choice;
				}
			}

			echo json_encode($item, JSON_PRETTY_PRINT);
		} else {
			echo json_encode(array('message' => 'No questions found.'));
		}
	} else {
		echo json_encode(array('message' => 'Wrong HTTP request method. Use GET instead.'));
	}

?>