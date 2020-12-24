<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	if ($_SERVER['REQUEST_METHOD'] == 'GET') {
		include_once '../config/Database.php';
		include_once '../models/question.php';

		$api_key = isset($_GET['key']) ? $_GET['key'] : die(json_encode(array('message' => 'No API key provided.')));

		$database = new Database();
		$db = $database->connect($api_key);

		$question = new Question($db);

		$from = isset($_GET['from']) ? $_GET['from'] : die();
		$to = isset($_GET['to']) ? $_GET['to'] : die();

		$result = $question->readRange($from, $to);

		$rows = $result->rowCount();

		if ($rows > 0) {
			$array = array();
			$array['data'] = array();
			while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
				extract($row);

				if ($question->question_type == "custom") {
					$item = array(
						'questionID' => $questionID,
						'question' => $question,
						'question_charLim' => $question_charLim,
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
					
				array_push($array['data'], $item);
				}
			}

			echo json_encode($array, JSON_PRETTY_PRINT);
		} else {
			echo json_encode(array('message' => 'No questions found.'));
		}
	} else {
		echo json_encode(array('message' => 'Wrong HTTP request method. Use GET instead.'));
	}
?>